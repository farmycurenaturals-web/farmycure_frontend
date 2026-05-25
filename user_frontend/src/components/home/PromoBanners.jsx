import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const banners = [
  {
    badge: 'Limited Offer',
    title: 'Cold-Pressed Oils: 20% OFF',
    tagline: 'Sourced from traditional wood-press mills for pure authentic aroma.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=800&fit=crop',
    link: '/shop?category=oils',
    accentColor: '#E6A15C'
  },
  {
    badge: 'Daily Harvest',
    title: 'Fresh Organic Herbs & Greens',
    tagline: 'Order by midnight, harvested at sunrise, delivered by afternoon.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=800&fit=crop',
    link: '/shop?category=vegetables',
    accentColor: '#95D5B2'
  },
  {
    badge: 'Staple Nutrition',
    title: 'Traditional Heirloom Grains',
    tagline: 'Sustainably grown native varieties of wheat and premium basmati rice.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=800&fit=crop',
    link: '/shop?category=grains',
    accentColor: '#D4AF37'
  },
  {
    badge: 'Fresh Dairy',
    title: 'A2 Organic Milk & Butter',
    tagline: 'Grass-fed cow milk, delivered fresh within 12 hours of milking.',
    image: 'https://images.unsplash.com/photo-1528750951167-a0e471d238f6?w=600&h=800&fit=crop',
    link: '/shop?category=dairy',
    accentColor: '#4CC9F0'
  }
]

const PromoBanners = () => {
  const [current, setCurrent] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(t)
  }, [current])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrent((prev) => (prev + 1) % banners.length)
    } else if (isRightSwipe) {
      setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section className="py-8 md:py-12 bg-[#FBFBF9] overflow-hidden select-none">
      <div 
        className="relative w-full overflow-visible"
        style={{
          '--card-width': 'min(82vw, 440px)',
          '--card-gap': '16px',
        }}
      >
        <div 
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translateX(calc(50% - (var(--card-width) / 2) - ${current} * (var(--card-width) + var(--card-gap))))`,
            gap: 'var(--card-gap)',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, idx) => {
            const isActive = idx === current
            return (
              <div
                key={idx}
                style={{ width: 'var(--card-width)' }}
                className={`relative h-[380px] sm:h-[460px] md:h-[520px] rounded-[28px] overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out ${
                  isActive 
                    ? 'scale-100 opacity-100 shadow-[0_20px_50px_rgba(27,67,50,0.15)] z-20' 
                    : 'scale-[0.92] opacity-40 shadow-md z-10'
                }`}
              >
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

                {/* Banner Content */}
                <div className={`absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-6 sm:p-8 text-white transition-all duration-500 ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                  <div className="space-y-1.5 text-left">
                    <span 
                      className="inline-block text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-white/15 backdrop-blur-sm border border-white/10"
                      style={{ color: banner.accentColor }}
                    >
                      {banner.badge}
                    </span>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold leading-tight drop-shadow-sm">
                      {banner.title}
                    </h3>
                    <p className="font-body text-[10px] sm:text-xs text-white/80 leading-relaxed max-w-[240px] sm:max-w-[280px] line-clamp-2">
                      {banner.tagline}
                    </p>
                    <div className="pt-2">
                      <Link 
                        to={banner.link}
                        className="inline-flex items-center text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-white text-[#1B4332] px-4.5 py-2 rounded-full hover:bg-white/95 shadow-sm transition-all duration-300 gap-1.5 group"
                      >
                        <span>Shop Collection</span>
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PromoBanners
