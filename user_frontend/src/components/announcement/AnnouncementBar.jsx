import Price from '../Price'

const AnnouncementBar = () => {
  const content = (
    <span className="text-white text-sm font-body inline-flex flex-wrap items-baseline gap-x-1">
      <span>100% Organic Farm Products | Free Shipping Above</span>
      <Price amount={999} size="xs" variant="onForest" />
      <span>| No Preservatives | Freshly Packed & Delivered</span>
    </span>
  )

  return (
    <div className="bg-forest h-10 overflow-hidden flex items-center">
      <div className="animate-scroll-left flex whitespace-nowrap pause-animation">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 inline-flex items-center">
            {content}
            <span className="mx-8 text-sage">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar
