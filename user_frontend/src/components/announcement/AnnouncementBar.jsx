import Price from '../Price'

const SEP = <span className="mx-2 text-[#2d6a4f]/50 sm:mx-3">•</span>

const AnnouncementBar = () => {
  const messagesDesktop = [
    '100% Organic Farm Products',
    'No Preservatives',
    'Freshly Packed & Delivered',
    'Trusted by families across India',
  ]

  /** Shorter copy for narrow screens — readable without feeling cramped */
  const mobileSegments = (
    <>
      <span className="shrink-0 rounded-full bg-[#2d6a4f]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1b4332]">
        Live
      </span>
      {SEP}
      <span>Organic farm products</span>
      {SEP}
      <span className="inline-flex items-baseline gap-0.5">
        Free ship <Price amount={999} size="xs" variant="default" className="!gap-0" />+
      </span>
      {SEP}
      <span>Fresh delivery</span>
      {SEP}
      <span>No preservatives</span>
    </>
  )

  return (
    <div
      role="region"
      aria-label="Announcements"
      className="border-b border-[#95d5b2]/45 bg-[#d8f3dc]"
    >
      {/* Mobile: taller tap target, slower marquee, compact copy */}
      <div className="overflow-hidden md:hidden">
        <div className="animate-[scroll-left_38s_linear_infinite] pause-animation flex min-h-[44px] w-max items-center whitespace-nowrap py-2.5 pl-4">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center pr-16 font-body text-xs font-medium leading-snug text-[#1b4332]">
              {mobileSegments}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop / tablet: full message strip */}
      <div className="hidden overflow-hidden md:block">
        <div className="animate-[scroll-left_26s_linear_infinite] pause-animation flex h-10 min-w-max items-center whitespace-nowrap">
          {[0, 1].map((rowIndex) => (
            <span key={rowIndex} className="inline-flex items-center">
              <span className="mx-5 inline-flex items-center rounded-full bg-[#2d6a4f]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1b4332]">
                Live
              </span>
              {messagesDesktop.map((message, idx) => (
                <span
                  key={`${rowIndex}-${idx}`}
                  className="mx-2 inline-flex items-center text-sm font-medium text-[#1b4332] sm:mx-3"
                >
                  <span>{message}</span>
                  <span className="mx-2 text-[#40916c]/80 sm:mx-3">•</span>
                </span>
              ))}
              <span className="mx-2 inline-flex items-center text-sm font-medium text-[#1b4332] sm:mx-3">
                <span>Free Shipping Above</span>
                <span className="mx-1.5 inline-flex items-baseline">
                  <Price amount={999} size="xs" variant="default" />
                </span>
                <span className="mx-2 text-[#40916c]/80 sm:mx-3">•</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {messagesDesktop.join('. ')}. Free shipping above 999 rupees.
      </div>
    </div>
  )
}

export default AnnouncementBar
