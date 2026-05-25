import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/shop?category=${category.id}`} className="group flex flex-col items-center select-none">
      {/* Circular Image Container */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white border border-gray-100 shadow-[0_4px_12px_rgba(27,67,50,0.03)] group-hover:shadow-[0_8px_20px_rgba(27,67,50,0.08)] group-hover:scale-105 group-hover:border-[#1B4332]/40 transition-all duration-300 flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-[#1B4332]/0 group-hover:bg-[#1B4332]/5 transition-colors duration-300" />
      </div>

      {/* Label */}
      <span className="mt-3 text-center font-body text-xs md:text-sm font-bold text-gray-800 group-hover:text-[#1B4332] transition-colors tracking-wide leading-tight">
        {category.name}
      </span>
    </Link>
  )
}

export default CategoryCard
