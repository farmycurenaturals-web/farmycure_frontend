import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
    <section className="py-16 md:py-24 bg-background">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Shop by Category
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of fresh products, each sourced 
            directly from trusted farms.
          </p>
        </motion.div>

        {/* Category Cards Grid - 4 columns on large screens */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
