import Price from '../Price'

const DeliveryInfo = () => {
  const infoItems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: 'Free Shipping',
      description: (
        <span className="inline-flex flex-wrap items-baseline gap-x-1">
          <span>Free delivery on orders above</span>
          <Price amount={499} size="sm" />
        </span>
      )
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Delivery Time',
      description: 'Dispatched within 2-3 business days'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Easy Returns',
      description: '7-day hassle-free return policy'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {infoItems.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-3 p-4 bg-sage/10 rounded-card"
        >
          <div className="text-forest flex-shrink-0 mt-0.5">
            {item.icon}
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-text-primary">
              {item.title}
            </h4>
            <p className="font-body text-xs text-gray-500 mt-0.5">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeliveryInfo
