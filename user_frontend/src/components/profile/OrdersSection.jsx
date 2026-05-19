import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../../services/api'
import Price from '../Price'

const itemImage = (item) => {
  if (item?.image) return item.image
  const p = item?.productId
  if (p && typeof p === 'object' && p.image) return p.image
  return ''
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
      <div className="bg-white rounded-[24px] border border-gray-100 p-12 text-center shadow-sm">
        <div className="animate-pulse flex flex-col items-center">
           <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
           <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
           <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-[24px] border border-red-100 p-6 text-sm text-red-600 font-medium text-center">
        {error}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-[24px] border border-gray-100 p-12 text-center shadow-sm">
        <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
           <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 text-sm mb-6">Looks like you haven't made any purchases.</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-2.5 bg-[#1f4d36] text-white rounded-full font-bold shadow-sm hover:shadow-md transition-all text-sm">
           Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="hidden sm:block">
        <h2 className="text-2xl font-heading font-bold text-gray-900">Order History</h2>
        <p className="text-sm text-gray-500 mt-1">Track, return, or buy things again.</p>
      </div>

      {orders.map((order) => {
        const rawStatus = getOrderStatus(order)
        return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={order._id}
          className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow overflow-hidden mb-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 sm:py-5 bg-gray-50/50 border-b border-gray-100">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-5">
              <div>
                <span className="block text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</span>
                <span className="font-mono text-[13px] sm:text-[14px] font-bold text-gray-900">
                  {String(order._id).slice(-10).toUpperCase()}
                </span>
              </div>
              
              <div className="sm:hidden">
                <StatusBadge status={rawStatus} />
              </div>

              <div className="hidden sm:block w-[1px] h-10 bg-gray-200"></div>
              
              <div className="hidden sm:block">
                <span className="block text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date Placed</span>
                <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 mt-1 sm:mt-0 w-full sm:w-auto">
               <div className="sm:hidden">
                 <span className="block text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date Placed</span>
                 <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">
                   {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                 </span>
               </div>
               <div className="hidden sm:block">
                  <StatusBadge status={rawStatus} />
               </div>
            </div>
          </div>
          
          {/* Items */}
          <div className="divide-y divide-gray-50 px-2 sm:px-6">
            {(order.items || []).map((item, idx) => (
              <div key={`${order._id}-${idx}`} className="flex gap-4 py-4 sm:py-5 px-3 sm:px-0">
                <div className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] shrink-0 rounded-[14px] border border-gray-100 bg-gray-50 overflow-hidden relative">
                  {itemImage(item) ? (
                    <img src={itemImage(item)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 text-center px-1 font-medium">No Image</div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="font-heading font-bold text-gray-900 text-[14px] sm:text-[16px] line-clamp-2 leading-tight hover:text-[#1f4d36] transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.productId?._id || item.productId}`)}>
                    {item.title || item.productId?.title || 'Product'}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 mt-1.5 font-medium">
                    Qty: <span className="text-gray-800">{item.quantity}</span>
                  </p>
                </div>

                <div className="flex flex-col items-end justify-center pl-2">
                  <Price amount={Number(item.price || 0) * Number(item.quantity || 0)} size="md" className="font-bold text-gray-900 !text-[15px] sm:!text-[17px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
              <div>
                <span className="block text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Total</span>
                <Price amount={order.totalPrice} size="lg" className="!text-[18px] sm:!text-[20px] font-bold text-gray-900" />
              </div>
            </div>
            
            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
               <button
                 type="button"
                 onClick={() => handleDownloadInvoice(order._id)}
                 disabled={downloadingOrderId === order._id}
                 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-full border border-gray-200 text-[13px] font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                 {downloadingOrderId === order._id ? 'Saving...' : 'Invoice'}
               </button>
               <button
                 type="button"
                 onClick={() => navigate(`/order/${order._id}`)}
                 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-full bg-[#1f4d36] text-white text-[13px] font-bold shadow-[0_4px_12px_rgba(31,77,54,0.2)] hover:shadow-[0_6px_16px_rgba(31,77,54,0.3)] sm:hover:-translate-y-0.5 active:scale-95 transition-all"
               >
                 Track Order
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
               </button>
            </div>
          </div>
        </motion.div>
        )
      })}
    </div>
  )
}

export default OrdersSection
