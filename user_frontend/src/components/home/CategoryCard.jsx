import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'

const CategoryCard = ({ category }) => {
  const isNonVeg = category.id === 'nonVeg'
  
  return (
    <Link to={`/shop?category=${category.id}`}>
      <Card hoverable className="h-full">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {isNonVeg && (
            <span className="absolute top-3 right-3 bg-nonveg text-white text-xs font-semibold px-2 py-1 rounded">
              Non-Veg
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
            {category.name}
          </h3>
          <p className="font-body text-sm text-gray-600 line-clamp-2">
            {category.description}
          </p>
          
          {/* Arrow indicator */}
          <motion.div 
            className={`mt-4 flex items-center font-medium text-sm ${isNonVeg ? 'text-nonveg' : 'text-forest'}`}
            whileHover={{ x: 5 }}
          >
            <span>Browse Products</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </Card>
    </Link>
  )
}

export default CategoryCard
