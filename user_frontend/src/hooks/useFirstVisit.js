import { useState, useEffect } from 'react'

const STORAGE_KEY = 'greenharvest_hasVisited'

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem(STORAGE_KEY)
    
    if (!hasVisited) {
      setIsFirstVisit(true)
      setShowSplash(true)
    }
  }, [])

  const dismissSplash = () => {
    setShowSplash(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const resetFirstVisit = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsFirstVisit(true)
    setShowSplash(true)
  }

  return { isFirstVisit, showSplash, dismissSplash, resetFirstVisit }
}
