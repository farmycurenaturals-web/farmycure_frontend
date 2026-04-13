import { motion } from 'framer-motion'

const CategoryFilter = ({ activeCategory, onCategoryChange, categories = [] }) => {
  const allOption = { id: null, name: 'All Products' }
  const filterOptions = [
    allOption,
    ...categories.map((cat) => ({
      id: cat.categoryCode || cat.slug,
      name: cat.name
    }))
  ]

  const isNonVegCategory = (categoryId) => categoryId === 'nonVeg'

  return (
    <aside className="w-full">
      <h3 className="font-heading text text-text-primary mb-lg font-semibold-4">
        Categories
      </h3>
      <ul className="space-y-2">
        {filterOptions.map((option) => {
          const isActive = activeCategory === option.id
          const isNonVeg = isNonVegCategory(option.id)
          return (
            <li key={option.id || 'all'}>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(option.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-card font-body text-sm
                  transition-colors duration-200
                  ${isActive
                    ? isNonVeg
                      ? 'bg-nonveg text-white font-medium'
                      : 'bg-[#1f4d36] text-white font-medium'
                    : isNonVeg
                      ? 'bg-white text-text-primary hover:bg-nonveg hover:text-white'
                      : 'bg-white text-text-primary hover:bg-[#1f4d36] hover:text-white'
                  }
                `}
              >
                {option.name}
              </motion.button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default CategoryFilter
