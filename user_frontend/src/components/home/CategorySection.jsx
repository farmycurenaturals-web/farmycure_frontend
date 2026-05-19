import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import CategoryCard from './CategoryCard'
import { fadeInUp, staggerContainer } from '../../animations/variants'
import { api } from '../../services/api'

const CategorySection = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.categories.list().then(setCategories).catch(() => setCategories([]))
  }, [])

  return (
    <section className="py-8 md:py-20 bg-background">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-12"
        >
          <h2 className="font-heading text-xl md:text-4xl font-bold text-text-primary mb-2 md:mb-4">
            Shop by Category
          </h2>
          <p className="font-body text-sm md:text-base text-gray-600 max-w-2xl mx-auto hidden md:block">
            Explore our carefully curated selection of fresh products, each sourced 
            directly from trusted farms.
          </p>
        </motion.div>

        {/* Mobile View: Horizontal Scrollable Circular Categories */}
        <div className="md:hidden flex overflow-x-auto gap-3 pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
          {categories.map((category) => {
            const id = category.categoryCode || category.slug;
            return (
              <Link 
                key={category._id} 
                to={`/shop?category=${id}`}
                className="flex flex-col items-center flex-shrink-0 snap-start group w-[64px]"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-gray-100/50 mb-1.5 p-[2px] bg-white group-hover:shadow-md transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-medium text-gray-600 text-center leading-tight line-clamp-2 px-1">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop View: Category Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category._id} variants={fadeInUp}>
              <CategoryCard category={{
                ...category,
                id: category.categoryCode || category.slug
              }} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default CategorySection
