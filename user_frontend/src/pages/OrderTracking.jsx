import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const getOrderStatus = (order) => String(order?.orderStatus || order?.status || '').trim()

const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase()
  if (s === 'delivered' || s === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-green-50 border border-green-100 text-green-700 tracking-wide">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
        DELIVERED
      </span>
    )
  }
  if (s === 'cancelled' || s === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-red-50 border border-red-100 text-red-600 tracking-wide">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
        CANCELLED
      </span>
    )
  }
  if (s === 'shipped') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-blue-50 border border-blue-100 text-blue-700 tracking-wide">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
        SHIPPED
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-amber-50 border border-amber-100 text-amber-700 tracking-wide">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      PROCESSING
    </span>
  )
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
      <main className="py-12 min-h-[70vh] bg-[#FAFAFA]">
        <Container>
          <div className="max-w-3xl mx-auto bg-white rounded-[24px] border border-gray-100 p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="animate-pulse flex flex-col items-center">
               <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
               <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
               <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
          </div>
        </Container>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="py-12 min-h-[70vh] bg-[#FAFAFA]">
        <Container>
          <div className="max-w-xl mx-auto bg-white rounded-[24px] border border-red-100 p-10 text-center shadow-sm">
             <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
             </div>
            <p className="text-gray-900 font-bold text-xl mb-2">Order not found</p>
            <p className="text-sm text-gray-500 mb-8">{error || 'We could not load this order.'}</p>
            <Link to="/profile?tab=orders" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
              Back to My Orders
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  const rawStatus = getOrderStatus(order)
  const statusNorm = normalizeStatus(rawStatus)
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
    <main className="py-8 md:py-14 min-h-[70vh] bg-[#FAFAFA]">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2 sm:px-0">
            <div>
              <Link to="/profile?tab=orders" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-gray-400 hover:text-gray-800 transition-colors mb-3 tracking-widest uppercase">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                BACK TO ORDERS
              </Link>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Track Order</h1>
              <div className="flex items-center gap-3 mt-1.5">
                 <p className="text-[13px] font-mono font-bold text-gray-500">ID: {String(order._id).slice(-12).toUpperCase()}</p>
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                 <p className="text-[13px] font-bold text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <StatusBadge status={rawStatus} />
              <button
                type="button"
                onClick={handleDownloadInvoice}
                disabled={downloading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 tracking-wide shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                {downloading ? 'SAVING...' : 'INVOICE'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            
            {/* Timeline Section */}
            <div className="p-5 sm:p-8 border-b border-gray-100 bg-gray-50/30">
              {isCancelled ? (
                <div className="rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 p-4">
                   <div className="mt-0.5"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                   <div>
                     <p className="text-red-800 font-bold text-[14px]">Order Cancelled</p>
                     <p className="text-red-600/80 text-[13px] mt-0.5">This order has been cancelled and no further updates will be made.</p>
                   </div>
                </div>
              ) : (
                <div className="relative pt-2 pb-2">
                  {/* Timeline Background Line */}
                  <div className="absolute top-[16px] left-[10%] right-[10%] h-[3px] bg-gray-200 z-0 rounded-full"></div>
                  {/* Timeline Active Line */}
                  <div 
                    className="absolute top-[16px] left-[10%] h-[3px] bg-[#1f4d36] z-0 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(Math.max(0, effectiveIndex) / (STEPS.length - 1)) * 80}%` }}
                  ></div>

                  <div className="flex items-start justify-between w-full relative z-10">
                    {STEPS.map((step, index) => {
                      const isCompleted = effectiveIndex >= index
                      const isCurrent = effectiveIndex === index
                      return (
                        <div key={step} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-[13px] font-bold transition-all duration-500
                              ${isCompleted ? 'bg-[#1f4d36] text-white shadow-[0_0_0_4px_rgba(31,77,54,0.1)]' : 'bg-white border-2 border-gray-200 text-gray-400'}`}
                          >
                            {isCompleted ? <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : index + 1}
                          </div>
                          <span
                            className={`mt-3 sm:mt-4 text-[10px] sm:text-[12px] text-center font-bold uppercase tracking-widest transition-colors duration-300
                              ${isCurrent ? 'text-[#1f4d36]' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}
                          >
                            {step}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Products Section */}
            <div className="p-5 sm:p-8">
              <h2 className="text-[15px] font-bold text-gray-400 uppercase tracking-widest mb-5">Order Items</h2>
              <div className="space-y-4">
                {(order.items || []).map((item, idx) => (
                  <div
                    key={`${order._id}-${idx}`}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] shrink-0 rounded-[12px] border border-gray-50 bg-gray-50 overflow-hidden relative">
                      {(item.image || item.productId?.image) ? (
                        <img src={item.image || item.productId?.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 text-center px-1 font-medium">No Image</div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <Link to={`/product/${item.productId?._id || item.productId}`} className="font-heading font-bold text-gray-900 text-[14px] sm:text-[16px] line-clamp-2 leading-tight hover:text-[#1f4d36] transition-colors">
                        {item.title || item.productId?.title || item.productId?.name || 'Product'}
                      </Link>
                      <p className="text-[13px] text-gray-500 mt-1 font-medium flex items-center gap-2">
                        Qty: <span className="text-gray-800 font-bold">{item.quantity}</span> 
                        <span className="text-gray-300">|</span> 
                        <Price amount={item.price} size="sm" className="inline text-gray-500 font-bold" />
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-center pl-2">
                      <Price amount={Number(item.price || 0) * Number(item.quantity || 0)} size="md" className="font-bold text-gray-900 !text-[16px] sm:!text-[18px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Footer */}
            <div className="bg-gray-50/50 px-5 sm:px-8 py-5 flex flex-wrap items-center justify-between border-t border-gray-100">
               <span className="font-bold text-gray-500 text-[14px] uppercase tracking-widest">Grand Total</span>
               <Price amount={order.totalPrice} size="lg" className="!text-[24px] font-bold text-[#1f4d36]" />
            </div>

            {/* Shipping Address Section */}
            <div className="border-t border-gray-100 p-5 sm:p-8">
               <h2 className="text-[15px] font-bold text-gray-400 uppercase tracking-widest mb-4">Shipping Information</h2>
               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex gap-4 items-start">
                 <div className="mt-0.5"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
                 <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                   {formatAddress(order.shippingAddress)}
                 </p>
               </div>
            </div>
            
          </div>
          
          {/* Bottom spacer for mobile */}
          <div className="h-12"></div>
        </motion.div>
      </Container>
    </main>
  )
}

export default OrderTracking
