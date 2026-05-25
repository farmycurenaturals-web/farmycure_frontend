import { useLocation } from 'react-router-dom'

const SEP = (dotColor) => <span className={`mx-2.5 sm:mx-4 ${dotColor}`}>•</span>

const AnnouncementBar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  
  const messages = [
    '100% Organic Products',
    'No Preservatives',
    'Farm Fresh Delivery',
    'Sustainable Farming',
    'Direct From Farm',
  ]

  const textColor = 'text-white font-semibold'
  const dotColor = 'text-[#95D5B2]/60'

  const renderedSegments = (
    <>
      {messages.map((message, idx) => (
        <span key={idx} className="inline-flex items-center">
          <span className={textColor}>{message}</span>
          {idx < messages.length - 1 && SEP(dotColor)}
        </span>
      ))}
      {SEP(dotColor)}
    </>
  )

  return (
    <div
      role="region"
      aria-label="Announcements"
      className={`bg-[#163a2d] text-white select-none overflow-hidden h-[34px] flex items-center border-b border-[#1b4332]/40 shadow-sm ${
        isHome ? 'absolute top-0 left-0 w-full z-50' : 'relative w-full'
      }`}
    >
      {/* Mobile Ticker */}
      <div className="overflow-hidden md:hidden w-full">
        <div className="animate-[scroll-left_30s_linear_infinite] pause-animation flex h-[34px] w-max items-center whitespace-nowrap pl-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center pr-4 font-body text-[10px] tracking-wide leading-none">
              {renderedSegments}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Ticker */}
      <div className="hidden overflow-hidden md:block w-full">
        <div className="animate-[scroll-left_24s_linear_infinite] pause-animation flex h-[34px] min-w-max items-center whitespace-nowrap">
          {[0, 1, 2].map((i) => (
            <span key={i} className="inline-flex items-center pr-4 font-body text-xs tracking-wider">
              {renderedSegments}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBar
