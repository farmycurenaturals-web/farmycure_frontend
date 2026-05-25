import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Container } from '../ui/Container'
import CategoryCard from './CategoryCard'
import { fadeInUp, staggerContainer } from '../../animations/variants'
import { api } from '../../services/api'
import { categories as staticCategories } from '../../data/categories'

const CategorySection = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.categories.list()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setCategories(res)
        } else {
          setCategories(staticCategories)
        }
      })
      .catch(() => {
        setCategories(staticCategories)
      })
  }, [])

  return (
    <section className="py-10 md:py-16 bg-[#FBFBF9] border-b border-gray-100/50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-[10px] md:text-xs font-bold text-[#1B4332] uppercase tracking-[0.2em] bg-[#1B4332]/5 px-3.5 py-1.5 rounded-full mb-2 inline-block">
            Our Specialties
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-[#1B4332] mb-2 md:mb-3">
            Shop by Category
          </h2>
          <p className="font-body text-xs md:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed px-4">
            Explore our curated selection of fresh harvest, cold pressed oils, and dairy items sourced directly from trusted organic farms.
          </p>
        </motion.div>

        {/* Categories Row (Scrollable on Mobile, Centered on Desktop) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex overflow-x-auto md:overflow-visible justify-start md:justify-center items-center gap-6 sm:gap-8 md:gap-12 pb-4 md:pb-0 hide-scrollbar px-4"
        >
          {categories.map((category) => {
            const id = category.categoryCode || category.slug || category.id
            return (
              <motion.div 
                key={category._id || category.id} 
                variants={fadeInUp}
                className="shrink-0"
              >
                <CategoryCard category={{
                  ...category,
                  id
                }} />
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

export default CategorySection

