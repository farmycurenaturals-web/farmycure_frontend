import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const banners = [
  {
    desktop: '/promo-essential-desktop.png',
    mobile: '/promo-essential-mobile.jpg',
    aspectMobile: 'aspect-[485/1024]',
    aspectDesktop: 'md:aspect-[1024/341]',
    link: '/shop?category=grains'
  },
  {
    desktop: '/promo-health-desktop.jpg',
    mobile: '/promo-health-mobile.jpg',
    aspectMobile: 'aspect-[485/1024]',
    aspectDesktop: 'md:aspect-[1024/512]',
    link: '/shop?category=vegetables'
  },
  {
    desktop: '/promo-fruits-desktop.png',
    mobile: '/promo-fruits-mobile.jpg',
    aspectMobile: 'aspect-[576/1024]',
    aspectDesktop: 'md:aspect-[1024/409]',
    link: '/shop?category=fruits'
  },
  {
    desktop: '/promo-nonveg-desktop.jpg',
    mobile: '/promo-nonveg-mobile.jpg',
    aspectMobile: 'aspect-[576/1024]',
    aspectDesktop: 'md:aspect-[1024/534]',
    link: '/shop?category=nonVeg'
  },
  {
    desktop: '/promo-rd-desktop.jpg',
    mobile: '/promo-rd-mobile.jpg',
    aspectMobile: 'aspect-[576/1024]',
    aspectDesktop: 'md:aspect-[1024/576]',
    link: '/about'
  },
  {
    desktop: '/promo-partner-desktop.jpg',
    mobile: '/promo-partner-mobile.png',
    aspectMobile: 'aspect-[485/1024]',
    aspectDesktop: 'md:aspect-[1024/512]',
    link: '/partners'
  },
  {
    desktop: '/promo-spices-desktop.png',
    mobile: '/promo-spices-mobile.jpg',
    aspectMobile: 'aspect-[485/1024]',
    aspectDesktop: 'md:aspect-[1737/906]',
    link: '/shop?category=spices'
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
      {/* CSS Ambient variables with responsive media query values */}
      <style>{`
        :root {
          --card-width: min(82vw, 290px);
          --card-gap: 16px;
        }
        @media (min-width: 768px) {
          :root {
            --card-width: 850px;
            --card-gap: 24px;
          }
        }
      `}</style>

      <div className="relative w-full overflow-visible">
        <div 
          className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
              <Link
                key={idx}
                to={banner.link}
                style={{ width: 'var(--card-width)' }}
                className={`relative ${banner.aspectMobile} ${banner.aspectDesktop} rounded-[28px] overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out block cursor-pointer bg-neutral-900 ${
                  isActive 
                    ? 'scale-100 opacity-100 shadow-[0_20px_50px_rgba(27,67,50,0.15)] z-20' 
                    : 'scale-[0.92] opacity-40 shadow-md z-10'
                }`}
              >
                {/* Main responsive contained picture tag */}
                <picture className="w-full h-full block">
                  <source media="(max-width: 768px)" srcSet={banner.mobile} />
                  <img 
                    src={banner.desktop} 
                    alt="Farmycure Promo Banner" 
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </picture>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PromoBanners
