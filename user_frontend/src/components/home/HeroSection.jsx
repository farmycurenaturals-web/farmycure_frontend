import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { fadeInUp, staggerContainer } from '../../animations/variants'

const slides = [
  {
    title: 'Authentic Organic Products Straight From the Farm',
    tagline: 'Fresh harvest delivered within 24 hours.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1080&h=600&fit=crop',
  },
  {
    title: 'Fresh Produce Delivered With Care',
    tagline: 'Naturally grown, thoughtfully packed.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1080&h=600&fit=crop',
  },
  {
    title: 'Organic Essentials For Healthy Living',
    tagline: 'Trusted farms. Transparent quality.',
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=1080&h=600&fit=crop',
  },
]

const HeroSection = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="bg-white pb-6 pt-3 md:pt-6">
      <Container>
        {/* Compact Top Search Bar */}
        <div className="mb-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-[18px] w-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for fresh organic products..." 
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[13px] md:text-sm focus:outline-none focus:ring-1 focus:ring-forest/50 transition-all placeholder-gray-400"
            />
          </div>
        </div>

        {/* Compact Rectangular Banner */}
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px] rounded-[16px] overflow-hidden shadow-sm border border-gray-100/50">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="min-w-full h-full relative">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={current}
              className="max-w-xl text-left"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-[18px] sm:text-2xl md:text-4xl font-bold leading-[1.2] text-white mb-1.5 md:mb-2 drop-shadow-md"
              >
                {slides[current].title}
              </motion.h1>

              <motion.h2
                variants={fadeInUp}
                className="text-[12px] sm:text-sm md:text-lg font-medium text-white/90 drop-shadow mb-3 md:mb-5"
              >
                {slides[current].tagline}
              </motion.h2>

              <motion.div variants={fadeInUp}>
                <Link to="/shop">
                  <Button variant="primary" className="px-5 py-2 md:px-8 md:py-2.5 text-[12px] md:text-sm shadow-md">
                    Shop Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Simple Carousel Indicators */}
          <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-[4px] rounded-full transition-all duration-300 ${
                  idx === current ? 'w-5 md:w-8 bg-white' : 'w-2 md:w-3 bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
