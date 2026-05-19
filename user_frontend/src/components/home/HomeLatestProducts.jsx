import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import Price from '../Price'
import { api } from '../../services/api'
import { fadeInUp, staggerContainer } from '../../animations/variants'
import { getStartingPrice, getVariantImage, getVariantTypes, getQuantities } from '../../utils/productPricing'

/** Live products from the same API the admin uses — new items appear here automatically. */
const HomeLatestProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.products
      .list()
      .then((data) => {
        const list = Array.isArray(data) ? data : []
        setProducts(list.slice(0, 8))
      })
      .catch(() => setProducts([]))
  }, [])

  if (products.length === 0) return null

  return (
    <section className="py-8 md:py-16 bg-gray-50 border-y border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="font-heading text-[22px] sm:text-3xl md:text-4xl font-bold text-text-primary mb-1 md:mb-3">
            In store now
          </h2>
          <p className="font-body text-[12px] md:text-[15px] text-gray-500 max-w-2xl mx-auto hidden md:block">
            Latest additions from our catalog — same inventory you manage in the admin panel.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6"
        >
          {products.map((product) => {
            const id = product._id || product.id
            const price = getStartingPrice(product)
            const label = product.title || product.name
            const firstType = getVariantTypes(product)[0] || null
            const firstQty = getQuantities(product, firstType)[0] || null
            const cardImage = getVariantImage(product, firstType, firstQty)
            const isNonVeg = product.category === 'nonVeg'
            
            return (
              <motion.div key={id || label} variants={fadeInUp}>
                <Link
                  to={id ? `/product/${id}` : '/shop'}
                  className="group flex flex-col bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-md transition-all active:scale-[0.98] sm:active:scale-100 overflow-hidden h-full border border-gray-100 sm:border-gray-100/60"
                >
                  <div className="relative aspect-[4/5] sm:aspect-square md:aspect-auto sm:h-48 overflow-hidden bg-gray-50">
                    {cardImage ? (
                      <img
                        src={cardImage}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400 text-[11px] px-2 text-center">
                        No Image
                      </div>
                    )}
                    {/* Dark gradient on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:hidden" />
                    
                    {/* Badge */}
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 z-10">
                      <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm sm:rounded-full text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                        isNonVeg ? 'bg-nonveg/95 text-white' : 'bg-[#1f4d36]/95 text-white sm:bg-white/90 sm:text-[#1f4d36]'
                      }`}>
                        {isNonVeg ? 'Non-Veg' : product.category || 'Fresh'}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1 bg-white">
                    <h3 className="font-heading text-[12px] leading-[1.3] sm:text-[13px] md:text-[15px] font-bold text-gray-800 line-clamp-2 group-hover:text-[#1f4d36] transition-colors">
                      {label}
                    </h3>
                    <p className="font-body text-[9px] sm:text-[11px] md:text-[12px] text-gray-400 sm:text-gray-500 mt-0.5 sm:mt-1 line-clamp-1 font-medium">
                      {product.description || 'Multiple variants'}
                    </p>
                    <div className="mt-auto pt-2.5 sm:pt-3 flex flex-col gap-2">
                      <div className="flex items-center">
                        {price != null ? (
                          <Price amount={price} size="sm" className="font-bold sm:!text-md !text-[#1f4d36]" />
                        ) : (
                          <p className="text-[11px] sm:text-[12px] md:text-[14px] font-semibold text-gray-500">See options</p>
                        )}
                      </div>
                      <div className="w-full h-[28px] sm:h-[36px] bg-[#1f4d36]/10 sm:bg-transparent border border-transparent sm:border-gray-200 text-[#1f4d36] sm:text-gray-700 rounded-full flex items-center justify-center text-[10px] sm:text-[13px] font-bold tracking-wide group-hover:bg-[#1f4d36] group-hover:text-white group-hover:border-[#1f4d36] transition-all">
                        View Product
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 md:mt-10 px-4 md:px-0"
        >
          <Link to="/shop">
            <Button variant="outline" size="sm" className="w-full md:w-auto md:px-8 md:py-2.5 md:text-sm rounded-full">
              Browse full shop
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

export default HomeLatestProducts
