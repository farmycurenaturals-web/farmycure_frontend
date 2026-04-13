import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import Price from '../Price'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../../utils/auth'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!isUserLoggedIn()) {
      alert('Please login to continue')
      setTimeout(() => {
        navigate('/login', { state: { from: '/shop', message: 'Please login to continue' } })
      }, 1000)
      return
    }
    addToCart(product, 1)
  }

  return (
    <Card hoverable className="h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-40 md:h-56 flex items-center justify-center text-gray-400 text-sm px-2 text-center">
            No Image Available
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-burnt-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
          {product.name}
        </h3>
        <p className="font-body text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <Price amount={product.price} size="lg" />
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard
