import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import Price from '../components/Price'
import { useCart } from '../context/CartContext'
import { fadeInUp, staggerContainer } from '../animations/variants'

const CartItem = ({ item, onUpdateQuantity, onRemove, itemKey }) => {
  const { product, quantity } = item
  const subtotal = product.price * quantity
  const isNonVeg = product.category === 'nonVeg'

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-card border border-gray-100"
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
        ) : (
          <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center px-1">
            No Image Available
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-lg font-semibold text-text-primary hover:text-forest transition-colors">
            {product.title}
          </h3>
        </Link>
        {product.selectedVariant && (
          <span className={`inline-block text-xs px-2 py-1 rounded mt-1 ${isNonVeg ? 'bg-nonveg/10 text-nonveg' : 'bg-sage/20 text-forest'}`}>
            {product.selectedVariant}
          </span>
        )}
        <div className="mt-2">
          <Price amount={product.price} size="md" />
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-200 rounded-card overflow-hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateQuantity(itemKey, quantity - 1)}
            className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-sage/20 transition-colors"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </motion.button>

          <span className="w-12 h-10 flex items-center justify-center font-body font-medium text-text-primary border-x border-gray-200">
            {quantity}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateQuantity(itemKey, quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-sage/20 transition-colors"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[100px]">
        <p className="font-body text-sm text-gray-500">Subtotal</p>
        <div className="flex justify-end">
          <Price amount={subtotal} size="md" />
        </div>
      </div>

      {/* Remove Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(itemKey)}
        className="p-2 text-gray-400 hover:text-deep-brown transition-colors"
        aria-label="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="w-24 h-24 mx-auto mb-6 bg-sage/20 rounded-full flex items-center justify-center">
      <svg className="w-12 h-12 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
      Your cart is empty
    </h2>
    <p className="font-body text-gray-600 mb-8 max-w-md mx-auto">
      Looks like you haven't added any products yet. Explore our collection of fresh products and find something you love.
    </p>
    <Link to="/shop">
      <Button variant="primary" size="lg">
        Continue Shopping
      </Button>
    </Link>
  </motion.div>
)

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartItemKey } = useCart()
  const { items, totalPrice } = cart

  const handleUpdateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey)
    } else {
      updateQuantity(itemKey, quantity)
    }
  }

  return (
    <main className="py-12 md:py-16 bg-background min-h-[60vh]">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            Your Cart
          </h1>
          {items.length > 0 && (
            <p className="font-body text-gray-600">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          )}
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="lg:flex lg:gap-8">
            {/* Cart Items */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex-1 space-y-4"
            >
              {items.map((item) => {
                const itemKey = getCartItemKey(item.product)
                return (
                  <CartItem
                    key={itemKey}
                    item={item}
                    itemKey={itemKey}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={removeFromCart}
                  />
                )
              })}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-80 mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-card p-6 border border-gray-100 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center font-body text-gray-600">
                    <span>Subtotal</span>
                    <Price amount={totalPrice} size="md" />
                  </div>
                  <div className="flex justify-between items-center font-body text-gray-600">
                    <span>Shipping</span>
                    <span className="text-forest font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-lg font-semibold text-text-primary">Total</span>
                      <Price amount={totalPrice} size="lg" />
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button variant="primary" className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/shop" className="block mt-4">
                  <Button variant="outline" className="w-full" size="md">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </main>
  )
}

export default Cart
