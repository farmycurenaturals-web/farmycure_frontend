import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import {
  hasTypeVariants,
  getVariantTypes,
  getQuantities,
  getPrice,
  getVariantImage
} from '../../utils/productPricing'
import { isUserLoggedIn } from '../../utils/auth'
import Price from '../Price'

const ProductModal = ({ product, isOpen, onClose, isBuyNow = false }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [selectedType, setSelectedType] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(null)
  const [itemQuantity, setItemQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) {
      const isRice = (product.productCode || product._id) === 'rice'
      const hasTypes = hasTypeVariants(product)
      
      if (isRice) {
        const subTypes = getVariantTypes(product)
        if (subTypes.length > 0) {
          setSelectedSubType(subTypes[0])
          const quantities = getQuantities(product, subTypes[0])
          setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
          setSelectedType(null)
        }
      } else if (hasTypes) {
        const types = getVariantTypes(product)
        if (types.length > 0) {
          setSelectedType(types[0])
          const quantities = getQuantities(product, types[0])
          setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
          setSelectedSubType(null)
        }
      } else {
        setSelectedType(null)
        setSelectedSubType(null)
        const quantities = getQuantities(product)
        setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
      }
      setItemQuantity(1)
      setAdded(false)
    }
  }, [product?._id])

  useEffect(() => {
    if (selectedType && product) {
      const quantities = getQuantities(product, selectedType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
    if (selectedSubType && product) {
      const quantities = getQuantities(product, selectedSubType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
  }, [selectedType, selectedSubType])

  if (!isOpen || !product) return null

  const isRice = (product.productCode || product._id) === 'rice'
  const isNonVeg = product.category === 'nonVeg'
  const hasTypes = hasTypeVariants(product)
  const variantTypes = getVariantTypes(product)
  const productId = product._id || product.id

  const availableQuantities = hasTypes
    ? isRice
      ? getQuantities(product, selectedSubType)
      : getQuantities(product, selectedType)
    : getQuantities(product)

  const currentPrice = isRice
    ? getPrice(product, selectedSubType, selectedQuantity)
    : getPrice(product, selectedType, selectedQuantity)
  
  const activeType = isRice ? selectedSubType : selectedType
  const modalImage = getVariantImage(product, activeType, selectedQuantity)
  const canAddToCart = currentPrice !== null && selectedQuantity !== null && (!hasTypes || Boolean(activeType))
  const wish = isWishlisted(productId)

  const formatTypeName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const formatSubTypeName = (subType) => {
    if (subType === 'kala_namak') return 'Kala Namak'
    return subType.charAt(0).toUpperCase() + subType.slice(1)
  }

  const buildVariantLabel = () => {
    const parts = []
    if (isRice && selectedSubType) {
      parts.push(formatSubTypeName(selectedSubType))
    } else if (selectedType) {
      parts.push(formatTypeName(selectedType))
    }
    if (selectedQuantity) parts.push(selectedQuantity)
    return parts.join(' - ')
  }

  const handleAddToCart = () => {
    if (!canAddToCart) return
    if (!isUserLoggedIn()) {
      alert('Please login to continue')
      setTimeout(() => {
        onClose()
        navigate('/login', { state: { from: '/shop', message: 'Please login to continue' } })
      }, 1000)
      return
    }

    const cartItem = {
      id: productId,
      productId: productId,
      title: product.title || product.name,
      image: modalImage,
      category: product.category,
      selectedType: isRice ? null : selectedType,
      selectedSubType: isRice ? selectedSubType : null,
      variant: activeType || 'default',
      selectedQuantity,
      selectedVariant: buildVariantLabel(),
      price: currentPrice
    }

    addToCart(cartItem, itemQuantity)
    setAdded(true)

    if (isBuyNow) {
      setTimeout(() => {
        onClose()
        navigate('/checkout')
      }, 500)
    } else {
      setTimeout(() => {
        setAdded(false)
        onClose()
      }, 1000)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4"
          onClick={handleOverlayClick}
        >
          {/* Draggable Drawer on Mobile, Centered Modal on Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 150) {
                onClose()
              }
            }}
            className="bg-[#FBFBF9] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-w-4xl sm:max-w-[850px] w-full p-0 sm:p-8 relative max-h-[92vh] sm:max-h-[85vh] overflow-hidden flex flex-col mx-auto border border-white/20"
          >
            {/* Drag Handle (Mobile Only) */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3 sm:hidden shrink-0 cursor-grab active:cursor-grabbing"></div>

            {/* Desktop & Mobile Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-20 hidden sm:block bg-white shadow-sm border border-gray-100/60"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Wishlist Icon Button (Top Right corner next to close button) */}
            <button
              onClick={() => toggleWishlist(productId)}
              className="absolute top-5 right-16 p-2 rounded-full hover:bg-gray-100 transition-colors z-20 hidden sm:block bg-white shadow-sm border border-gray-100/60"
            >
              <svg 
                className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                fill={wish ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                strokeWidth={2} 
                viewBox="0 0 24 24"
              >
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <div className="overflow-y-auto sm:overflow-visible flex-1 hide-scrollbar h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 h-full">
                
                {/* Image Gallery Column */}
                <div className="relative w-full h-[280px] sm:h-[400px] bg-white sm:rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center">
                  {modalImage ? (
                    <motion.img
                      key={modalImage}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={modalImage}
                      alt={product.title || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image Available</span>
                  )}

                  {/* Mobile Close Button (Overlaid on Image top right) */}
                  <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 sm:hidden w-8 h-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white z-20 shadow-md"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Details Column */}
                <div className="flex flex-col px-5 sm:px-0 pb-20 sm:pb-0 h-full">
                  
                  {/* Category Pill */}
                  <span className={`w-fit text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-sm ${
                    isNonVeg ? 'bg-red-50 text-red-700' : 'bg-[#1B4332]/5 text-[#1B4332]'
                  }`}>
                    {isNonVeg ? 'Non-Veg' : product.category || 'Fresh'}
                  </span>

                  {/* Title */}
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.title || product.name}
                  </h2>

                  {/* Description */}
                  <p className="font-body text-xs text-gray-500 mb-4 sm:mb-6 leading-relaxed">
                    {product.description || 'Grown with extreme care in chemical-free farms, prioritizing natural soils, eco-friendly irrigation, and natural nutrition retention.'}
                  </p>

                  {/* Price */}
                  <div className="mb-5 sm:mb-6 flex items-baseline gap-2">
                    {currentPrice != null ? (
                      <>
                        <Price amount={currentPrice * itemQuantity} size="lg" className="!text-2xl sm:!text-3xl font-bold !text-[#1B4332]" />
                        <span className="text-[10px] text-gray-400 font-medium font-body">Subtotal</span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold text-gray-400">Select options below</span>
                    )}
                  </div>

                  {/* Variant Selection Chips */}
                  {hasTypes && variantTypes.length > 0 && (
                    <div className="mb-4 sm:mb-5">
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                        {isRice ? 'Select Rice Type' : 'Select Variant'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {variantTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => isRice ? setSelectedSubType(type) : setSelectedType(type)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                              (isRice ? selectedSubType : selectedType) === type
                                ? isNonVeg
                                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                  : 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {isRice ? formatSubTypeName(type) : formatTypeName(type)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Size Selection */}
                  {availableQuantities.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                        Select Pack Size
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {availableQuantities.map((qty) => {
                          const price = hasTypes
                            ? isRice
                              ? getPrice(product, selectedSubType, qty)
                              : getPrice(product, selectedType, qty)
                            : getPrice(product, null, qty)
                          return (
                            <button
                              key={qty}
                              onClick={() => setSelectedQuantity(qty)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-2 ${
                                selectedQuantity === qty
                                  ? isNonVeg
                                    ? 'bg-red-600 text-white border-red-600'
                                    : 'bg-[#1B4332] text-white border-[#1B4332]'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                              }`}
                            >
                              <span>{qty}</span>
                              {price != null && (
                                <span className={`text-[10px] opacity-75 font-normal ${selectedQuantity === qty ? 'text-white' : 'text-gray-400'}`}>
                                  (₹{price})
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Stepper & Buy Action Buttons */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-1.5 py-1.5 w-[110px] shrink-0 shadow-sm">
                      <button 
                        onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-800 text-xs w-4 text-center">{itemQuantity}</span>
                      <button 
                        onClick={() => setItemQuantity(itemQuantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#1B4332] text-sm font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!canAddToCart}
                      className={`flex-1 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                        isNonVeg
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-100 disabled:bg-gray-200'
                          : 'bg-[#1B4332] hover:bg-[#122e22] text-white shadow-emerald-100 disabled:bg-gray-200 disabled:shadow-none'
                      } ${!canAddToCart ? 'cursor-not-allowed' : ''}`}
                    >
                      {added ? 'Added to Cart!' : isBuyNow ? 'Proceed to Checkout' : 'Add to Cart'}
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal

