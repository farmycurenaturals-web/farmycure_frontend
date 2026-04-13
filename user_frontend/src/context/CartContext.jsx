/* eslint-disable react-refresh/only-export-components -- CartProvider + useCart pair */
import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const CartContext = createContext(null)

const getCartItemKey = (item) => {
  const typePart = item.selectedType || item.selectedSubType || ''
  const qtyPart = item.selectedQuantity || ''
  return `${item.id}-${typePart}-${qtyPart}`
}

const calculateTotals = (items) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
})

const toUiItems = (serverCart) => {
  if (!serverCart?.items) return []
  return serverCart.items.map((item) => ({
    _id: item._id,
    quantity: item.quantity,
    product: {
      id: item.productId?._id || item.productId,
      title: item.title || item.productId?.title || item.productId?.name || 'Product',
      image: item.image || item.productId?.image || '',
      category: item.category || item.productId?.category || '',
      selectedVariant: item.variant,
      price: item.price
    }
  }))
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const cart = useMemo(() => ({ items, ...calculateTotals(items) }), [items])

  const refreshCart = useCallback(async () => {
    try {
      const serverCart = await api.cart.get()
      setItems(toUiItems(serverCart))
    } catch {
      setItems([])
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = useCallback((product, quantity = 1) => {
    const payload = {
      productId: product.id,
      variant: product.selectedVariant || product.selectedQuantity || 'default',
      quantity,
      price: product.price,
      title: product.title,
      image: product.image,
      category: product.category
    }
    api.cart.add(payload).then(refreshCart).catch(() => null)
  }, [refreshCart])

  const removeFromCart = useCallback((itemKey) => {
    const item = items.find((entry) => getCartItemKey(entry.product) === itemKey)
    if (!item?._id) return
    api.cart.remove(item._id).then(refreshCart).catch(() => null)
  }, [items, refreshCart])

  const updateQuantity = useCallback((itemKey, quantity) => {
    const item = items.find((entry) => getCartItemKey(entry.product) === itemKey)
    if (!item?._id) return
    api.cart.updateItem(item._id, quantity).then(refreshCart).catch(() => null)
  }, [items, refreshCart])

  const clearCart = useCallback(() => {
    api.cart.clear().then(refreshCart).catch(() => null)
  }, [refreshCart])

  const getItemQuantity = useCallback(
    (product) => {
      const itemKey = getCartItemKey(product)
      const item = items.find((entry) => getCartItemKey(entry.product) === itemKey)
      return item ? item.quantity : 0
    },
    [items]
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity, getCartItemKey }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
