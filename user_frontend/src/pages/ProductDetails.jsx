import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import Price from '../components/Price'
import DeliveryInfo from '../components/product/DeliveryInfo'
import { useCart } from '../context/CartContext'
import {
  hasTypeVariants,
  getVariantTypes,
  getQuantities,
  getPrice,
  getVariantImage
} from '../utils/productPricing'
import { fadeIn, fadeInUp } from '../animations/variants'
import { api } from '../services/api'
import { isUserLoggedIn } from '../utils/auth'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(null)
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState(null)
  const [categories, setCategories] = useState([])

  const isRice = (product?.productCode || product?._id) === 'rice'

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, categoriesData] = await Promise.all([
          api.products.getById(id),
          api.categories.list()
        ])
        setProduct(productData)
        setCategories(categoriesData)
      } catch (_error) {
        setProduct(null)
      }
    }
    loadData()
  }, [id])

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
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
    }
  }, [product?._id, isRice])

  // Update quantity selection when type or subtype changes
  useEffect(() => {
    if (product && selectedType) {
      const quantities = getQuantities(product, selectedType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
    if (product && selectedSubType) {
      const quantities = getQuantities(product, selectedSubType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
  }, [selectedType, selectedSubType])

  if (!product) {
    return (
      <main className="py-16 md:py-24 bg-background min-h-[60vh]">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-3">
              Product Not Found
            </h1>
            <p className="font-body text-gray-600 mb-8">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Browse All Products
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  const category = categories.find((c) => (c.categoryCode || c.slug) === product.category)
  const isNonVeg = product.category === 'nonVeg'
  const hasTypes = hasTypeVariants(product)
  const variantTypes = getVariantTypes(product)
  const availableQuantities = hasTypes
    ? isRice
      ? getQuantities(product, selectedSubType)
      : getQuantities(product, selectedType)
    : getQuantities(product)

  const currentPrice = isRice
    ? getPrice(product, selectedSubType, selectedQuantity)
    : getPrice(product, selectedType, selectedQuantity)
  const activeType = isRice ? selectedSubType : selectedType
  const detailImage = getVariantImage(product, activeType, selectedQuantity)
  const canAddToCart = currentPrice !== null && selectedQuantity !== null && (!hasTypes || Boolean(activeType))

  // Build a readable variant string for the cart
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
        navigate('/login', { state: { from: `/product/${id}`, message: 'Please login to continue' } })
      }, 1000)
      return
    }

    const cartItem = {
      id: product._id,
      productId: product._id,
      title: product.title || product.name,
      image: detailImage,
      category: product.category,
      selectedType: isRice ? null : selectedType,
      selectedSubType: isRice ? selectedSubType : null,
      variant: activeType || 'default',
      selectedQuantity,
      selectedVariant: buildVariantLabel(),
      price: currentPrice
    }

    addToCart(cartItem, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Format type name for display
  const formatTypeName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  // Format subtype name for display (e.g., kala_namak -> Kala Namak)
  const formatSubTypeName = (subType) => {
    if (subType === 'kala_namak') return 'Kala Namak'
    return subType.charAt(0).toUpperCase() + subType.slice(1)
  }

  return (
    <div className="relative min-h-screen">

      {(product.productCode || product._id) === 'banana' && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1603833665858-e61d17a86224')"
          }}
        />
      )}

      <div className="relative z-10">
    <main className="py-8 md:py-12 min-h-[60vh]">
      <Container>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 font-body text-sm text-gray-500 mb-8"
        >
          <Link to="/" className="hover:text-forest transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-forest transition-colors">Shop</Link>
          <span>/</span>
          {category && (
            <>
              <Link
                to={`/shop?category=${category.categoryCode || category.slug}`}
                className="hover:text-forest transition-colors"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-text-primary">{product.title || product.name}</span>
        </motion.nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Product Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-card overflow-hidden shadow-md"
          >
            <div className="aspect-square bg-gray-100">
              {detailImage ? (
                <img
                  src={detailImage}
                  alt={product.title || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full min-h-[280px] flex items-center justify-center text-gray-400 text-sm px-4 text-center">
                  No Image Available
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Category Badge */}
            {category && (
              <Link to={`/shop?category=${category.categoryCode || category.slug}`}>
                <span className={`inline-block font-body text-xs font-semibold px-3 py-1 rounded-full mb-4 transition-colors ${
                  isNonVeg
                    ? 'bg-nonveg text-white'
                    : 'bg-sage/20 text-forest hover:bg-sage/30'
                }`}>
                  {category.name}
                </span>
              </Link>
            )}

            {/* Product Name */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {product.title || product.name}
            </h1>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 mb-6">
              {currentPrice != null ? (
                <>
                  <Price amount={currentPrice} size="lg" />
                  <span className="font-body text-sm text-gray-400">inclusive of all taxes</span>
                </>
              ) : (
                <span className="font-heading text-3xl font-bold text-text-primary">Select options</span>
              )}
            </div>

            {/* Type Selector (if has type variants) */}
            {hasTypes && variantTypes.length > 0 && (
              <div className="mb-6">
                <label className="font-body text-sm font-medium text-text-primary mb-3 block">
                  {isRice ? 'Select Subtype' : 'Select Type'}
                </label>
                <div className="flex flex-wrap gap-3">
                  {variantTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => isRice ? setSelectedSubType(type) : setSelectedType(type)}
                      className={`px-4 py-2 rounded-card font-body text-sm transition-all ${
                        (isRice ? selectedSubType : selectedType) === type
                          ? isNonVeg
                            ? 'bg-nonveg text-white'
                            : 'bg-forest text-white'
                          : 'bg-white border border-gray-200 text-text-primary hover:border-gray-400'
                      }`}
                    >
                      {isRice ? formatSubTypeName(type) : formatTypeName(type)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {availableQuantities.length > 0 && (
              <div className="mb-6">
                <label className="font-body text-sm font-medium text-text-primary mb-3 block">
                  {hasTypes ? 'Select Quantity' : 'Select Option'}
                </label>
                <div className="flex flex-wrap gap-3">
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
                        className={`px-4 py-2 rounded-card font-body text-sm transition-all flex flex-col items-center min-w-[80px] ${
                          selectedQuantity === qty
                            ? isNonVeg
                              ? 'bg-nonveg text-white'
                              : 'bg-forest text-white'
                            : 'bg-white border border-gray-200 text-text-primary hover:border-gray-400'
                        }`}
                      >
                        <span className="font-medium">{qty}</span>
                        {price != null && (
                          <span className="mt-1">
                            <Price
                              amount={price}
                              size="xs"
                              variant={selectedQuantity === qty ? 'onDark' : 'muted'}
                            />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Button
                variant={isNonVeg ? 'nonVeg' : 'primary'}
                size="lg"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="w-full sm:w-auto"
              >
                {added ? 'Added!' : canAddToCart ? 'Add to Cart' : 'Select Options'}
              </Button>
            </div>

            {/* Selection Summary */}
            {canAddToCart && (
              <p className="font-body text-sm text-gray-600 mb-6">
                {product.title} - {buildVariantLabel()}
              </p>
            )}

            {/* Divider */}
            <hr className="border-gray-100 mb-6" />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                Product Details
              </h3>
              <ul className="space-y-2 font-body text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNonVeg ? 'text-nonveg' : 'text-forest'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% Natural & Fresh
                </li>
                <li className="flex items-start gap-2">
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNonVeg ? 'text-nonveg' : 'text-forest'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No Artificial Preservatives or Chemicals
                </li>
                <li className="flex items-start gap-2">
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNonVeg ? 'text-nonveg' : 'text-forest'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sourced from Trusted Farms
                </li>
                <li className="flex items-start gap-2">
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNonVeg ? 'text-nonveg' : 'text-forest'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Freshly Packed for Maximum Quality
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <DeliveryInfo />
        </motion.div>
      </Container>
    </main>
    </div>
    </div>
  )
}

export default ProductDetails
