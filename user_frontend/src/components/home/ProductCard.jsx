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
    <Card hoverable className="h-full flex flex-col group">
      {/* Image */}
      <div className="relative aspect-square sm:aspect-auto sm:h-48 md:h-56 overflow-hidden bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-[11px] px-2 text-center">
            No Image
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-burnt-orange/90 backdrop-blur-md text-white text-[10px] md:text-xs font-semibold px-2 py-[2px] md:px-3 md:py-1 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h3 className="font-heading text-[13px] md:text-[16px] font-semibold text-text-primary mb-1 leading-snug group-hover:text-forest transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="font-body text-[11px] md:text-[13px] text-gray-500 mb-3 md:mb-4 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <Price amount={product.price} size="md" className="!text-forest" />
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleAddToCart}
            className="!px-3 !py-1.5 md:!px-4 md:!py-2 !text-[11px] md:!text-[13px]"
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard
