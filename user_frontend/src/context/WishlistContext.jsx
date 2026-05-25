import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('farmycure_wishlist')
      if (stored) {
        setWishlistIds(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e)
    }
  }, [])

  // Toggle item in wishlist
  const toggleWishlist = useCallback((productId) => {
    if (!productId) return
    setWishlistIds((prev) => {
      const exists = prev.includes(productId)
      let next
      if (exists) {
        next = prev.filter((id) => id !== productId)
      } else {
        next = [...prev, productId]
      }
      localStorage.setItem('farmycure_wishlist', JSON.stringify(next))
      return next
    })
  }, [])

  const isWishlisted = useCallback((productId) => {
    return wishlistIds.includes(productId)
  }, [wishlistIds])

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
