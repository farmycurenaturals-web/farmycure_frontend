import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 tracking-wider uppercase border border-emerald-100/50">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Delivered
      </span>
    )
  }
  if (s === 'cancelled' || s === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 tracking-wider uppercase border border-red-100/50">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
        Cancelled
      </span>
    )
  }
  if (s === 'shipped') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 tracking-wider uppercase border border-blue-100/50">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        Shipped
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 tracking-wider uppercase border border-amber-100/50">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
      Processing
    </span>
  )
}

const OrderTimeline = ({ status }) => {
  const s = (status || '').toLowerCase()
  const isCancelled = s === 'cancelled' || s === 'canceled'
  
  // Steps: Ordered (0) -> Shipped (1) -> Delivered (2)
  let currentStep = 0
  if (s === 'shipped') currentStep = 1
  if (s === 'delivered' || s === 'completed') currentStep = 2

  const stepState = (stepIndex) => {
    if (isCancelled) return 'pending'
    if (currentStep >= stepIndex) return 'done'
    return 'pending'
  }

  if (isCancelled) {
    return (
      <div className="py-4 px-6 bg-red-50/30 rounded-2xl border border-red-100/50 text-xs font-semibold text-red-700 flex items-center gap-2">
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        This order has been cancelled and refunded.
      </div>
    )
  }

  return (
    <div className="py-5 px-6 bg-gray-50/40 rounded-2xl border border-gray-100/80 flex items-center justify-between gap-2 max-w-lg">
      {/* Step 1: Confirmed */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
          stepState(0) === 'done' ? 'bg-[#1B4332] text-white' : 'bg-gray-200 text-gray-400'
        }`}>
          ✓
        </div>
        <span className="text-[10px] font-bold text-gray-800 mt-1 uppercase tracking-wider">Ordered</span>
      </div>

      {/* Line */}
      <div className={`h-[2px] flex-1 -mt-4 transition-all duration-500 ${
        stepState(1) === 'done' ? 'bg-[#1B4332]' : 'bg-gray-200'
      }`}></div>

      {/* Step 2: Shipped */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
          stepState(1) === 'done' ? 'bg-[#1B4332] text-white' : 'bg-gray-200 text-gray-400'
        }`}>
          {stepState(1) === 'done' ? '✓' : '2'}
        </div>
        <span className="text-[10px] font-bold text-gray-800 mt-1 uppercase tracking-wider">Shipped</span>
      </div>

      {/* Line */}
      <div className={`h-[2px] flex-1 -mt-4 transition-all duration-500 ${
        stepState(2) === 'done' ? 'bg-[#1B4332]' : 'bg-gray-200'
      }`}></div>

      {/* Step 3: Delivered */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
          stepState(2) === 'done' ? 'bg-[#1B4332] text-white' : 'bg-gray-200 text-gray-400'
        }`}>
          {stepState(2) === 'done' ? '✓' : '3'}
        </div>
        <span className="text-[10px] font-bold text-gray-800 mt-1 uppercase tracking-wider">Delivered</span>
      </div>
    </div>
  )
}

const OrderCard = ({ order, handleDownloadInvoice, downloadingOrderId, navigate }) => {
  const [expanded, setExpanded] = useState(false)
  const rawStatus = getOrderStatus(order)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(27,67,50,0.02)] overflow-hidden"
    >
      {/* Header Info Banner */}
      <div className="bg-[#FBFBF9] border-b border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <div>
            <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Order Ref</span>
            <span className="font-mono text-xs font-bold text-gray-900 uppercase">
              #{String(order._id).slice(-8)}
            </span>
          </div>
          <div className="w-[1px] h-8 bg-gray-200 hidden sm:block"></div>
          <div>
            <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Date Placed</span>
            <span className="text-xs font-semibold text-gray-700">
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
            </span>
          </div>
        </div>
        <div>
          <StatusBadge status={rawStatus} />
        </div>
      </div>

      {/* Inner Timeline Progress */}
      <div className="p-5 sm:p-6 border-b border-gray-50 bg-white">
        <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3">Delivery Progress</span>
        <OrderTimeline status={rawStatus} />
      </div>

      {/* Collapsible Action Trigger */}
      <div className="px-5 sm:px-6 py-3.5 bg-gray-50/20 border-b border-gray-50 flex items-center justify-between text-xs font-semibold text-gray-600 cursor-pointer select-none hover:bg-gray-50/50 transition-colors" onClick={() => setExpanded(!expanded)}>
        <span>Items ordered ({order.items?.length || 0})</span>
        <button className="flex items-center gap-1 text-[#1B4332]">
          <span>{expanded ? 'Hide Details' : 'View Details'}</span>
          <svg className={`w-3.5 h-3.5 transform transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
        </button>
      </div>

      {/* Collapsible Product Preview Cards */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-white"
          >
            <div className="divide-y divide-gray-50 px-5 sm:px-6">
              {(order.items || []).map((item, idx) => (
                <div key={`${order._id}-${idx}`} className="flex gap-4 py-4.5">
                  <div className="w-14 h-14 shrink-0 rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden relative">
                    {itemImage(item) ? (
                      <img src={itemImage(item)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-400 text-center font-medium">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p 
                      className="font-heading font-bold text-gray-900 text-sm hover:text-[#1B4332] cursor-pointer transition-colors truncate"
                      onClick={() => navigate(`/product/${item.productId?._id || item.productId}`)}
                    >
                      {item.title || item.productId?.title || 'Organic Product'}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium font-body">
                      Quantity: <span className="text-gray-800">{item.quantity}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                    <Price amount={Number(item.price || 0) * Number(item.quantity || 0)} size="sm" className="font-bold text-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Total Summary & Actions */}
      <div className="px-5 sm:px-6 py-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Grand Total</span>
          <Price amount={order.totalPrice} size="lg" className="!text-xl font-bold !text-[#1B4332]" />
        </div>
        
        <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleDownloadInvoice(order._id)}
            disabled={downloadingOrderId === order._id}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            {downloadingOrderId === order._id ? 'Saving...' : 'Invoice'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate(`/order/${order._id}`)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-100 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <span>Track Order</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </motion.div>
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
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-[0_8px_30px_rgba(27,67,50,0.02)]">
        <div className="animate-pulse flex flex-col items-center">
           <div className="w-12 h-12 bg-gray-100 rounded-full mb-4"></div>
           <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
           <div className="h-3 bg-gray-50 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50/50 rounded-3xl border border-red-100 p-6 text-xs text-red-600 font-semibold text-center">
        {error}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-[0_8px_30px_rgba(27,67,50,0.02)] max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
           <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 font-heading">No orders yet</h3>
        <p className="text-gray-500 text-xs mb-6">Looks like you haven&apos;t made any purchases yet.</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-2.5 bg-[#1B4332] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all">
           Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="hidden sm:block">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Order History</h2>
        <p className="text-xs text-gray-500 mt-1">Track shipping progress and download invoices.</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard 
            key={order._id}
            order={order}
            handleDownloadInvoice={handleDownloadInvoice}
            downloadingOrderId={downloadingOrderId}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersSection

