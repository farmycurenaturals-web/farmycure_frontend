export const products = [
  // FRUITS
  {
    id: "banana",
    category: "fruits",
    title: "Banana",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    variants: {
      fresh: {
        "1kg": 60,
        "5kg": 280,
        "10kg": 520
      },
      flakes: {
        "0.5kg": 120,
        "1kg": 220,
        "5kg": 950
      },
      powder: {
        "200g": 90,
        "500g": 180,
        "1kg": 350
      }
    }
  },
  {
    id: "mango",
    category: "fruits",
    title: "Mango",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    variants: {
      fresh: {
        "1kg": 120,
        "5kg": 550,
        "10kg": 1000
      },
      flakes: {
        "0.5kg": 150,
        "1kg": 280,
        "5kg": 1200
      },
      powder: {
        "200g": 180,
        "500g": 400,
        "1kg": 750
      }
    }
  },

  // VEGETABLES
  {
    id: "tomato",
    category: "vegetables",
    title: "Tomato",
    image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=400&fit=crop",
    variants: {
      fresh: {
        "1kg": 40,
        "5kg": 180,
        "10kg": 350
      },
      flakes: {
        "0.5kg": 90,
        "1kg": 160,
        "5kg": 700
      },
      powder: {
        "200g": 70,
        "500g": 150,
        "1kg": 280
      }
    }
  },
  {
    id: "onion",
    category: "vegetables",
    title: "Onion",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop",
    variants: {
      fresh: {
        "1kg": 35,
        "5kg": 160,
        "10kg": 300
      },
      flakes: {
        "0.5kg": 85,
        "1kg": 150,
        "5kg": 650
      },
      powder: {
        "200g": 65,
        "500g": 140,
        "1kg": 260
      }
    }
  },

  // GRAINS
  {
    id: "wheat",
    category: "grains",
    title: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
    variants: {
      "1kg": 60,
      "5kg": 280,
      "10kg": 540
    }
  },
  {
    id: "rice",
    category: "grains",
    title: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    variants: {
      basmati: {
        "1kg": 70,
        "5kg": 320,
        "10kg": 600
      },
      "kala_namak": {
        "1kg": 90,
        "5kg": 420,
        "10kg": 800
      }
    }
  },
  {
    id: "soybean",
    category: "grains",
    title: "Soybean",
    image: "https://images.unsplash.com/photo-1586201375840-8e1cd1a56544?w=400&h=400&fit=crop",
    variants: {
      "1kg": 80,
      "5kg": 360,
      "10kg": 680
    }
  },

  // NON-VEG (Dehydrated Only)
  {
    id: "chicken",
    category: "nonVeg",
    title: "Chicken",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=400&fit=crop",
    variants: {
      "0.5kg": 450,
      "1kg": 850,
      "5kg": 3900
    }
  },
  {
    id: "mutton",
    category: "nonVeg",
    title: "Mutton",
    image: "https://images.unsplash.com/photo-1604908177522-0409b9e4c36f?q=80&w=1470&auto=format&fit=crop",
    variants: {
      "0.5kg": 650,
      "1kg": 1200,
      "5kg": 5500
    }
  },
  {
    id: "fish",
    category: "nonVeg",
    title: "Fish",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop",
    variants: {
      "0.5kg": 550,
      "1kg": 1000,
      "5kg": 4700
    }
  },
  {
    id: "shrimp",
    category: "nonVeg",
    title: "Shrimp",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop",
    variants: {
      "200g": 300,
      "500g": 650,
      "1kg": 1200,
      "5kg": 5500
    }
  },
  {
    id: "eggs",
    category: "nonVeg",
    title: "Eggs",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    variants: {
      Kadakanath: {
        "12 pieces": 280,
        "30 pieces": 650
      },
      Sonali: {
        "12 pieces": 120,
        "30 pieces": 300
      }
    }
  }
]

// Helper to check if product has type variants (fresh/flakes/powder etc)
export const hasTypeVariants = (product) => {
  if (!product.variants || Object.keys(product.variants).length === 0) return false
  const firstKey = Object.keys(product.variants)[0]
  return typeof product.variants[firstKey] === 'object'
}

// Get variant types for a product (e.g., ['fresh', 'flakes', 'powder'])
export const getVariantTypes = (product) => {
  if (!hasTypeVariants(product)) return []
  return Object.keys(product.variants)
}

// Get quantities for a specific type or for simple variants
export const getQuantities = (product, type = null) => {
  if (!product.variants) return []
  if (hasTypeVariants(product) && type) {
    return Object.keys(product.variants[type] || {})
  }
  if (!hasTypeVariants(product)) {
    return Object.keys(product.variants)
  }
  return []
}

// Get price for a product given type and quantity selection
export const getPrice = (product, type = null, quantity = null) => {
  if (!product.variants) return null
  if (hasTypeVariants(product)) {
    if (!type || !quantity) return null
    return product.variants[type]?.[quantity] || null
  }
  if (quantity) {
    return product.variants[quantity] || null
  }
  return null
}

// Get starting price for display
export const getStartingPrice = (product) => {
  if (!product.variants || Object.keys(product.variants).length === 0) return null

  if (hasTypeVariants(product)) {
    const firstType = Object.keys(product.variants)[0]
    const quantities = product.variants[firstType]
    if (quantities) {
      const prices = Object.values(quantities)
      return Math.min(...prices)
    }
  } else {
    const prices = Object.values(product.variants)
    return Math.min(...prices)
  }
  return null
}

export const getProductById = (id) => {
  return products.find(p => p.id === id)
}

export const getProductsByCategory = (category) => {
  if (!category) return products
  return products.filter(p => p.category === category)
}
