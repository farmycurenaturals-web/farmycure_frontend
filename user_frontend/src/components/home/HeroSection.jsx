import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { fadeInUp, staggerContainer } from '../../animations/variants'

const slides = [
  {
    title: 'Authentic Organic Products Straight From the Farm',
    subtitle: 'FarmyCure Naturals',
    tagline: 'Soil to Soul',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop',
  },
  {
    title: 'Fresh Produce Delivered With Care',
    subtitle: 'Naturally grown, thoughtfully packed',
    tagline: 'Pure Everyday Nutrition',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=1080&fit=crop',
  },
  {
    title: 'Organic Essentials For Healthy Living',
    subtitle: 'Trusted farms. Transparent quality.',
    tagline: 'Eat Clean, Feel Good',
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=1920&h=1080&fit=crop',
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

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section className="relative h-[60vh] sm:h-[68vh] md:h-[78vh] lg:h-[82vh] -mt-16 md:-mt-20 overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="min-w-full h-full relative">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        className="absolute z-20 left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/35 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <button
        onClick={goNext}
        className="absolute z-20 right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/35 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <Container className="relative z-10 h-full flex items-center py-10 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={current}
          className="max-w-4xl space-y-3 md:space-y-4 text-center md:text-left mx-auto md:mx-0"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg font-medium text-white/85 tracking-wide"
          >
            {slides[current].subtitle}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-white"
          >
            {slides[current].title}
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="text-xl sm:text-3xl md:text-5xl font-bold leading-[1.1] text-white mt-3 md:mt-6"
          >
            {slides[current].tagline}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 items-center md:items-start"
          >
            <Link to="/shop">
              <Button variant="primary" size="lg" className="w-[220px] sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline-white" size="lg" className="w-[220px] sm:w-auto">
                Explore Categories
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-6 bg-white' : 'w-2 bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
