import { useState, useEffect, useRef } from 'react'

const WHATSAPP_NUMBER = '919793180013'
const DEFAULT_MESSAGE = "Hi FarmyCure Naturals, I'm interested in your products!"
const TOOLTIP_DELAY_MS = 3000

const buildWaUrl = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

const CATEGORIES = [
  {
    title: 'Products',
    icon: '🛒',
    items: [
      { label: 'Product Inquiry', message: 'Hi 👋 I would like to know more about your products.\nProduct Name:\nQuantity:\nLocation:' },
      { label: 'Pricing Inquiry', message: 'Hi 👋 Can you share pricing details for the following product?\nProduct Name:\nRequired Quantity:' },
      { label: 'Product Availability', message: 'Hi 👋 I would like to check product availability.\nProduct Name:\nNeeded Quantity:' },
      { label: 'Bulk Orders', message: 'Hi 👋 I am interested in placing a bulk order.\nProduct Name:\nQuantity:\nBusiness/Shop Name:' },
    ],
  },
  {
    title: 'Orders & Delivery',
    icon: '🚚',
    items: [
      { label: 'Place an Order', message: 'Hi 👋 I would like to place an order.\nProduct Name:\nQuantity:\nDelivery Address:' },
      { label: 'Delivery Inquiry', message: 'Hi 👋 Can you provide delivery details for my location?\nLocation:\nProducts Needed:' },
      { label: 'Track My Order', message: 'Hi 👋 I would like to track my order.\nOrder ID:\nPhone Number:' },
    ],
  },
  {
    title: 'Support',
    icon: '🛠️',
    items: [
      { label: 'General Questions', message: 'Hi 👋 I have a few questions regarding your services/products.' },
      { label: 'Report an Issue', message: 'Hi 👋 I am facing an issue.\nIssue Type:\nOrder ID (if available):\nProblem Description:' },
      { label: 'Payment Issue', message: 'Hi 👋 I am facing a payment-related issue.\nTransaction ID:\nProblem:' },
    ],
  },
  {
    title: 'Contact',
    icon: '📞',
    items: [
      { label: 'Request Callback', message: 'Hi 👋 Please arrange a callback.\nPreferred Time:\nTopic:' },
      { label: 'Contact Support', message: 'Hi 👋 I would like to talk with customer support.' },
      { label: 'Email Request', message: 'Hi 👋 Please share your official email and business contact details.' },
    ],
  },
  {
    title: 'Business',
    icon: '🤝',
    items: [
      { label: 'Partnership Inquiry', message: 'Hi 👋 I am interested in partnership/business opportunities.' },
      { label: 'Dealer / Distributor', message: 'Hi 👋 I would like to become a dealer/distributor.\nBusiness Name:\nLocation:' },
    ],
  },
  {
    title: 'Feedback',
    icon: '⭐',
    items: [
      { label: 'Share Feedback', message: 'Hi 👋 I would like to share feedback regarding your products/services.' },
    ],
  },
]

const WhatsAppIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.908 15.908 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.335 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.8-8.064-7.116-.23-.316-1.93-2.572-1.93-4.904s1.222-3.476 1.656-3.952c.434-.476.948-.596 1.264-.596.316 0 .632.002.908.016.292.014.684-.11 1.07.816.39.94 1.326 3.232 1.442 3.466.116.234.194.508.038.816-.154.316-.232.512-.462.788-.232.274-.488.612-.696.822-.232.234-.474.488-.204.958.272.468 1.208 1.992 2.594 3.228 1.782 1.588 3.284 2.082 3.75 2.316.468.234.742.196 1.014-.118.274-.316 1.17-1.364 1.482-1.834.312-.468.624-.39 1.054-.234.432.158 2.722 1.284 3.188 1.518.468.234.778.352.894.546.116.196.116 1.124-.274 2.222Z" />
  </svg>
)

const WhatsAppButton = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expandedCat, setExpandedCat] = useState(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (dismissed || panelOpen) return
    const timer = setTimeout(() => setShowTooltip(true), TOOLTIP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [dismissed, panelOpen])

  useEffect(() => {
    if (!panelOpen) return
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [panelOpen])

  const handleFabClick = () => {
    setShowTooltip(false)
    setDismissed(true)
    setPanelOpen((prev) => !prev)
  }

  const toggleCategory = (idx) => {
    setExpandedCat((prev) => (prev === idx ? null : idx))
  }

  return (
    <div
      className="fixed bottom-20 lg:bottom-5 right-4 z-50 flex flex-col items-end gap-3"
      ref={panelRef}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Quick Support Panel */}
      {panelOpen && (
        <div
          className="w-[340px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          style={{
            animation: 'waSlideUp 0.3s ease forwards',
          }}
        >
          {/* Panel Header */}
          <div className="bg-[#075E54] px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <WhatsAppIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">FarmyCure Naturals</p>
              <p className="text-green-200 text-xs mt-0.5">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setPanelOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat bubble intro */}
          <div className="bg-[#ECE5DD] px-4 py-3 flex-shrink-0">
            <div className="bg-white rounded-lg rounded-tl-none px-3.5 py-2.5 shadow-sm max-w-[85%]">
              <p className="text-sm text-gray-800 leading-relaxed">
                Hi there! 👋 How can we help you today? Choose an option below or start a chat.
              </p>
              <p className="text-[10px] text-gray-400 text-right mt-1">just now</p>
            </div>
          </div>

          {/* Categories accordion */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {CATEGORIES.map((cat, catIdx) => (
              <div key={cat.title} className="border-b border-gray-50 last:border-b-0">
                <button
                  onClick={() => toggleCategory(catIdx)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-lg flex-shrink-0">{cat.icon}</span>
                  <span className="flex-1 text-sm font-semibold text-gray-800">{cat.title}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedCat === catIdx ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedCat === catIdx && (
                  <div className="px-4 pb-3 space-y-1.5" style={{ animation: 'waFadeIn 0.2s ease' }}>
                    {cat.items.map((item) => (
                      <a
                        key={item.label}
                        href={buildWaUrl(item.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30 transition-all group"
                      >
                        <span className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                        </span>
                        <span className="text-sm text-gray-700 group-hover:text-[#075E54] font-medium transition-colors">
                          {item.label}
                        </span>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#25D366] ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* General chat footer */}
          <div className="border-t border-gray-100 px-4 py-3 flex-shrink-0">
            <a
              href={buildWaUrl(DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold transition-colors"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" />
              Start a General Chat
            </a>
          </div>
        </div>
      )}

      {/* Tooltip */}
      <div className="flex items-end gap-3">
        {showTooltip && !panelOpen && (
          <div
            className="relative bg-white rounded-2xl shadow-lg px-4 py-3 max-w-[220px] border border-gray-100"
            style={{
              animation: 'waFadeIn 0.3s ease forwards',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); setDismissed(true) }}
              className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full w-5 h-5 flex items-center justify-center shadow-sm hover:bg-gray-50 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss"
            >
              <svg viewBox="0 0 14 14" fill="currentColor" className="w-3 h-3">
                <path d="M13.3.71a1 1 0 0 0-1.42 0L7 5.59 2.12.71A1.008 1.008 0 1 0 .71 2.12L5.59 7 .71 11.88a1.008 1.008 0 1 0 1.41 1.41L7 8.41l4.88 4.88a1.008 1.008 0 1 0 1.41-1.41L8.41 7l4.88-4.88a1.01 1.01 0 0 0 .01-1.41Z" />
              </svg>
            </button>
            <p className="text-sm text-gray-700 leading-snug font-medium">
              Hi! How can we help you?
            </p>
            <div
              className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0"
              style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '8px solid white' }}
            />
          </div>
        )}

        {/* FAB */}
        <button
          onClick={handleFabClick}
          aria-label="Chat on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl active:scale-95"
          style={{
            background: panelOpen ? '#075E54' : '#25D366',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            transform: panelOpen ? 'rotate(0deg)' : undefined,
          }}
        >
          <span className="text-white" style={{
            transition: 'transform 0.3s ease',
            transform: panelOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}>
            {panelOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <WhatsAppIcon />
            )}
          </span>
          {!panelOpen && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes waSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes waFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default WhatsAppButton
