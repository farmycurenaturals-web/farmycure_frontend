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
    <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">
            In store now
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Latest additions from our catalog — same inventory you manage in the admin panel.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => {
            const id = product._id || product.id
            const price = getStartingPrice(product)
            const label = product.title || product.name
            const firstType = getVariantTypes(product)[0] || null
            const firstQty = getQuantities(product, firstType)[0] || null
            const cardImage = getVariantImage(product, firstType, firstQty)
            return (
              <motion.div key={id || label} variants={fadeInUp}>
                <Link
                  to={id ? `/product/${id}` : '/shop'}
                  className="group block bg-white rounded-card shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full border border-gray-100"
                >
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    {cardImage ? (
                      <img
                        src={cardImage}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-40 flex items-center justify-center text-gray-400 text-sm px-2 text-center">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-text-primary line-clamp-2 group-hover:text-forest transition-colors">
                      {label}
                    </h3>
                    <p className="font-body text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description || product.category}
                    </p>
                    <div className="mt-3">
                      {price != null ? (
                        <Price amount={price} size="lg" />
                      ) : (
                        <p className="font-heading text-lg font-bold text-gray-500">See options</p>
                      )}
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
          className="text-center mt-10"
        >
          <Link to="/shop">
            <Button variant="outline" size="lg">
              Browse full shop
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

export default HomeLatestProducts
