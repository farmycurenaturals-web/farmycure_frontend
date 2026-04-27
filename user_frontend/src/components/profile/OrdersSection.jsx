import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import Price from '../Price'

const itemImage = (item) => {
  if (item?.image) return item.image
  const p = item?.productId
  if (p && typeof p === 'object' && p.image) return p.image
  return ''
}

const getOrderStatus = (order) => String(order?.orderStatus || order?.status || '').trim()

const OrdersSection = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloadingOrderId, setDownloadingOrderId] = useState('')

  const handleDownloadInvoice = async (orderId) => {
    try {
      setDownloadingOrderId(orderId)
      const { blob, headers } = await api.orders.getInvoice(orderId)
      const objectUrl = window.URL.createObjectURL(blob)
      const contentDisposition = headers.get('content-disposition') || ''
      const nameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
      const fileName = nameMatch?.[1] || `invoice-${orderId}.pdf`

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
      setDownloadingOrderId('')
    }
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError('')
        const data = await api.user.getOrders()
        if (!cancelled) setOrders(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load orders')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500 text-sm">
        Loading orders…
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-100 p-6 text-sm text-red-600">{error}</div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-600 text-sm">
        You have no orders yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#1f4d36]">My orders</h2>
      {orders.map((order) => {
        const rawStatus = getOrderStatus(order)
        return (
        <div
          key={order._id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-600">
            <span>
              Order <span className="font-mono text-gray-800">{String(order._id).slice(-8)}</span>
            </span>
            <span className="capitalize">
              Status: <strong className="text-[#1f4d36]">{rawStatus || '—'}</strong>
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</span>
              <button
                type="button"
                onClick={() => navigate(`/order/${order._id}`)}
                className="text-sm text-[#1f4d36] underline font-medium"
              >
                Track Order
              </button>
              <button
                type="button"
                onClick={() => handleDownloadInvoice(order._id)}
                disabled={downloadingOrderId === order._id}
                className="text-sm text-[#1f4d36] underline font-medium disabled:text-gray-400 disabled:no-underline"
              >
                {downloadingOrderId === order._id ? 'Downloading...' : 'Download Invoice'}
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {(order.items || []).map((item, idx) => (
              <div key={`${order._id}-${idx}`} className="flex gap-4 p-4">
                <div className="w-16 h-16 shrink-0 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden">
                  {itemImage(item) ? (
                    <img src={itemImage(item)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 text-center px-1 leading-tight">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm line-clamp-2">
                    {item.title || item.productId?.title || 'Product'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex flex-wrap items-baseline gap-x-1">
                    <span>Qty: {item.quantity} ·</span>
                    <Price amount={item.price} size="xs" />
                    <span>each</span>
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                  <Price amount={Number(item.price || 0) * Number(item.quantity || 0)} size="md" />
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Total</span>
            <Price amount={order.totalPrice} size="lg" />
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default OrdersSection
