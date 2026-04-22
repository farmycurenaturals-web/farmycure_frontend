import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import Price from '../components/Price'
import { api } from '../services/api'

const STEPS = ['Placed', 'Processing', 'Shipped', 'Delivered']

const normalizeStatus = (raw) => {
  const s = String(raw || '').trim()
  if (STEPS.includes(s)) return s
  const lower = s.toLowerCase()
  const legacy = {
    pending: 'Placed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    completed: 'Delivered',
    cancelled: 'Cancelled',
    canceled: 'Cancelled'
  }
  return legacy[lower] || s
}

const formatAddress = (addr) => {
  if (!addr || typeof addr !== 'object') return '—'
  const parts = [
    addr.fullName,
    addr.address,
    [addr.city, addr.state].filter(Boolean).join(', '),
    addr.pincode,
    addr.phone && `Phone: ${addr.phone}`,
    addr.email
  ].filter(Boolean)
  return parts.length ? parts.join('\n') : '—'
}

const OrderTracking = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!id) {
        setError('Order not found')
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        setError('')
        const data = await api.orders.getById(id)
        if (!cancelled) setOrder(data)
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Order not found')
          setOrder(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <main className="py-12 min-h-[50vh] bg-background">
        <Container>
          <p className="text-center text-gray-600 text-sm">Loading...</p>
        </Container>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="py-12 min-h-[50vh] bg-background">
        <Container>
          <div className="max-w-lg mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-800 font-medium mb-2">Order not found</p>
            <p className="text-sm text-gray-500 mb-6">{error || 'We could not load this order.'}</p>
            <Link to="/profile?tab=orders" className="text-sm text-[#1f4d36] underline font-medium">
              Back to My Orders
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  const statusNorm = normalizeStatus(order.status)
  const isCancelled = statusNorm === 'Cancelled'
  const statusIndex = STEPS.indexOf(statusNorm)
  const effectiveIndex = isCancelled ? -1 : (statusIndex >= 0 ? statusIndex : 0)
  const handleDownloadInvoice = async () => {
    if (!order?._id) return
    try {
      setDownloading(true)
      const { blob, headers } = await api.orders.getInvoice(order._id)
      const objectUrl = window.URL.createObjectURL(blob)
      const contentDisposition = headers.get('content-disposition') || ''
      const nameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
      const fileName = nameMatch?.[1] || `invoice-${order._id}.pdf`

      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = fileName
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.URL.revokeObjectURL(objectUrl)
    } catch (e) {
      setError(e.message || 'Failed to download invoice')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main className="py-10 md:py-14 min-h-[70vh] bg-background">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/profile?tab=orders" className="text-sm text-[#1f4d36] hover:underline">
              ← My orders
            </Link>
            <h1 className="font-heading text-2xl font-bold text-text-primary mt-2">Track order</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">ID · {String(order._id).slice(-12)}</p>
            <button
              type="button"
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="mt-3 text-sm text-[#1f4d36] underline font-medium disabled:text-gray-400 disabled:no-underline"
            >
              {downloading ? 'Downloading...' : 'Download Invoice'}
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            {isCancelled && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-100 text-red-800 text-sm px-4 py-3">
                This order was cancelled.
              </div>
            )}

            {!isCancelled && (
              <div className="overflow-x-auto pb-1">
                <div className="flex items-start w-full min-w-[300px]">
                  {STEPS.map((step, index) => {
                    const isCompleted = effectiveIndex >= index
                    return (
                      <div key={step} className="flex items-center flex-1 min-w-0 last:flex-none">
                        <div className="flex flex-col items-center shrink-0 w-16 md:w-20">
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
                              ${isCompleted ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                          >
                            {index + 1}
                          </div>
                          <span
                            className={`mt-2 text-[10px] md:text-xs text-center font-medium leading-tight
                              ${isCompleted ? 'text-[#1f4d36]' : 'text-gray-500'}`}
                          >
                            {step}
                          </span>
                        </div>
                        {index !== STEPS.length - 1 && (
                          <div
                            className={`h-1 flex-1 mt-4 mx-0.5 md:mx-1 rounded-sm min-h-[4px]
                              ${effectiveIndex >= index ? 'bg-green-600' : 'bg-gray-300'}`}
                            aria-hidden
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <p className="mt-6 text-lg font-semibold text-[#1f4d36]">
              Order Status: {order.status || '—'}
            </p>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Items</h2>
              <ul className="space-y-3">
                {(order.items || []).map((item, idx) => (
                  <li
                    key={`${order._id}-${idx}`}
                    className="flex flex-wrap justify-between gap-2 text-sm border-b border-gray-50 pb-3 last:border-0"
                  >
                    <span className="text-gray-800 font-medium">
                      {item.title || item.productId?.title || item.productId?.name || 'Product'}
                    </span>
                    <span className="text-gray-600 flex flex-wrap items-baseline gap-x-1">
                      <span>Qty {item.quantity} ×</span>
                      <Price amount={item.price} size="sm" />
                    </span>
                    <span className="w-full flex justify-end md:w-auto md:ml-auto md:justify-start">
                      <Price amount={Number(item.price || 0) * Number(item.quantity || 0)} size="md" />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <span className="font-semibold text-text-primary">Total</span>
                <Price amount={order.totalPrice} size="lg" />
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Delivery address</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">{formatAddress(order.shippingAddress)}</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default OrderTracking
