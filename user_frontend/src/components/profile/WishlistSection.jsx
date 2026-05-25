import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWishlist } from '../../context/WishlistContext'
import { api } from '../../services/api'
import ShopProductCard from '../shop/ShopProductCard'
import ProductModal from '../shop/ProductModal'

const WishlistSection = () => {
  const navigate = useNavigate()
  const { wishlistIds } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBuyNow, setIsBuyNow] = useState(false)

  useEffect(() => {
    let active = true
    api.products.list()
      .then((data) => {
        if (active) {
          const list = Array.isArray(data) ? data : []
          setProducts(list.filter((p) => wishlistIds.includes(p._id || p.id)))
          setLoading(false)
        }
      })
      .catch(() => {
        if (active) {
          setProducts([])
          setLoading(false)
        }
      })
    return () => { active = false }
  }, [wishlistIds])

  const openProductModal = (product, buyNow = false) => {
    setSelectedProduct(product)
    setIsBuyNow(buyNow)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setIsBuyNow(false)
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-500 font-medium">Loading wishlist...</div>
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 font-heading">Your wishlist is empty</h3>
        <p className="text-gray-500 text-xs mb-6">Explore the harvest and add your favorites here!</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-2.5 bg-[#1B4332] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all">
          Browse Shop
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Your Wishlist</h2>
        <p className="text-xs text-gray-500 mt-1">Products you have saved for later.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <motion.div 
            key={product._id} 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ShopProductCard product={product} onOpenModal={openProductModal} />
          </motion.div>
        ))}
      </div>

      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal}
        isBuyNow={isBuyNow}
      />
    </div>
  )
}

export default WishlistSection
