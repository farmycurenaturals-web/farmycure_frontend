const MobileFilters = ({ activeCategory, onCategoryChange, categories = [] }) => {
  const allOption = { id: null, name: 'All' }
  const filterOptions = [
    allOption,
    ...categories.map((cat) => ({
      id: cat.categoryCode || cat.slug,
      name: cat.name
    }))
  ]

  return (
    <div className="lg:hidden mb-6 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        {filterOptions.map((option) => {
          const isActive = activeCategory === option.id
          return (
            <button
              key={option.id || 'all'}
              onClick={() => onCategoryChange(option.id)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full font-body text-sm
                transition-colors duration-200 flex-shrink-0
                ${isActive
                  ? 'bg-forest text-white font-medium'
                  : 'bg-white text-text-primary border border-gray-200 hover:border-forest'
                }
              `}
            >
              {option.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileFilters
