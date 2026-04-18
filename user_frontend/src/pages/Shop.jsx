import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import ShopProductCard from '../components/shop/ShopProductCard'
import ProductModal from '../components/shop/ProductModal'
import { fadeInUp, staggerContainer } from '../animations/variants'
import { api } from '../services/api'

const slides = [
  {
    title: "Fresh Products",
    subtitle: "Directly from farms to your home",
    button: "Shop Fresh",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Pure & Processed",
    subtitle: "Cold-pressed oils and essentials",
    button: "Explore Oils",
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Dehydrated Essentials",
    subtitle: "Long-lasting natural nutrition",
    button: "View Products",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Organic Grains",
    subtitle: "Sustainably grown staples",
    button: "Shop Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
  }
]

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || null

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBuyNow, setIsBuyNow] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const isValidCategory = (slug) =>
    categories.some((cat) => (cat.categoryCode || cat.slug) === slug)

  const effectiveCategory = activeCategory && isValidCategory(activeCategory)
    ? activeCategory
    : null

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await api.categories.list()
        setCategories(categoriesData)
      } catch {
        setCategories([])
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [effectiveCategory])

  useEffect(() => {
    if (activeCategory && categories.length > 0 && !isValidCategory(activeCategory)) {
      setSearchParams({})
      return
    }

    const loadProducts = async () => {
      try {
        setLoadingProducts(true)
        const { items, pagination } = await api.products.listPaged({
          page,
          limit: 8,
          sortBy: 'createdAt',
          order: 'desc',
          category: effectiveCategory,
        })
        setProducts(items)
        setTotalPages(Math.max(1, Number(pagination?.totalPages) || 1))
        setTotalCount(Number(pagination?.total) || items.length)
      } catch {
        setProducts([])
        setTotalPages(1)
        setTotalCount(0)
      } finally {
        setLoadingProducts(false)
      }
    }

    loadProducts()
  }, [activeCategory, categories, effectiveCategory, page, setSearchParams])

  const handleCategoryChange = (categoryId) => {
    setPage(1)
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

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

  const activeCategoryName = effectiveCategory
    ? categories.find((c) => (c.categoryCode || c.slug) === effectiveCategory)?.name
    : 'All Products'

  const visiblePages = useMemo(() => {
    if (totalPages <= 1) return []
    const pages = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }
    for (let p = start; p <= end; p += 1) pages.push(p)
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }, [page, totalPages])

  return (
    <main className="py-10 md:py-16 bg-background min-h-[60vh]">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            Our Products
          </h1>
          <p className="font-body text-gray-600 max-w-2xl">
            Explore our collection of fresh and natural products, sourced directly
            from trusted farms across India.
          </p>
        </motion.div>

        {/* Carousel Slider */}
        <div className="mt-8 md:mt-10 max-w-6xl mx-auto">
          <div className="relative h-[230px] sm:h-[280px] md:h-[340px] rounded-2xl overflow-hidden shadow-md">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-5 sm:px-8 md:px-12 max-w-xl text-white">
                    <h2 className="text-xl sm:text-3xl font-semibold mb-2 md:mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base mb-4 md:mb-5">
                      {slide.subtitle}
                    </p>
                    <button className="bg-[#1f4d36] text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-[#173c2b] transition">
                      {slide.button}
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/50 transition"
              aria-label="Previous banner"
            >
              &#8249;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/50 transition"
              aria-label="Next banner"
            >
              &#8250;
            </button>
          </div>

          {/* DOTS */}
          <div className="flex justify-center mt-4 gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "w-6 bg-[#1f4d36]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Categories */}
        <section className="mt-8 md:mt-10">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4 md:gap-5 min-w-max px-1">
              <button
                onClick={() => handleCategoryChange(null)}
                className="flex flex-col items-center gap-2 group"
              >
                <span
                  className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center bg-white text-xs md:text-sm font-medium transition ${
                    effectiveCategory === null ? 'border-forest text-forest shadow-sm' : 'border-gray-200 text-gray-500 group-hover:border-forest/60'
                  }`}
                >
                  All
                </span>
                <span className={`text-xs md:text-sm ${effectiveCategory === null ? 'text-forest font-medium' : 'text-gray-600'}`}>
                  All Products
                </span>
              </button>
              {categories.map((cat) => {
                const id = cat.categoryCode || cat.slug
                const active = effectiveCategory === id
                return (
                  <button key={id} onClick={() => handleCategoryChange(id)} className="flex flex-col items-center gap-2 group">
                    <span className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 overflow-hidden bg-white transition ${active ? 'border-forest shadow-sm' : 'border-gray-200 group-hover:border-forest/60'}`}>
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center text-[10px] md:text-xs text-gray-500 px-1">
                          {cat.name?.slice(0, 8)}
                        </span>
                      )}
                    </span>
                    <span className={`text-xs md:text-sm text-center max-w-[80px] md:max-w-[96px] truncate ${active ? 'text-forest font-medium' : 'text-gray-600'}`}>
                      {cat.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <div className="mt-6 md:mt-8">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-gray-500">
                Showing {products.length} product{products.length !== 1 ? 's' : ''} of {totalCount}
                {effectiveCategory && (
                  <> in <span className="font-medium text-forest">{activeCategoryName}</span></>
                )}
              </p>
            </div>

            {loadingProducts ? (
              <div className="text-center py-16 text-gray-500">Loading products...</div>
            ) : products.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                key={`${effectiveCategory || 'all'}-${page}`}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                {products.map((product) => (
                  <motion.div key={product._id} variants={fadeInUp}>
                    <ShopProductCard product={product} onOpenModal={openProductModal} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="font-heading text-xl text-text-primary mb-2">No products found</h3>
                <p className="font-body text-gray-500">
                  Try selecting a different category.
                </p>
              </div>
            )}

            {!loadingProducts && totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <div className="flex items-center gap-1 mx-1">
                  {visiblePages.map((p, idx) =>
                    p === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${p}`}
                        type="button"
                        onClick={() => setPage(Number(p))}
                        className={`min-w-9 h-9 px-2 rounded-lg text-sm border transition ${
                          Number(p) === page
                            ? 'bg-[#1f4d36] text-white border-[#1f4d36]'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
        </div>
      </Container>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal}
        isBuyNow={isBuyNow}
      />
    </main>
  )
}

export default Shop
