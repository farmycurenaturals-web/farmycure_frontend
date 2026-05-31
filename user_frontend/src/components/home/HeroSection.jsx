import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Container } from '../ui/Container'

const LeafIcon = ({ className, style }) => (
  <svg className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
    <path d="M17 8C8 14 3 21 3 21S10 16 19 10C21 9 22 7 22 5C22 3 20 2 18 2C16 2 13 4 17 8z" fill="#95D5B2" opacity="0.4" />
  </svg>
)

const slides = [
  {
    desktop: '/hero-slide-1-desktop.jpg',
    mobile: '/hero-slide-1-mobile.jpg',
    alt: 'FarmyCure Premium Banner - From Our Farm To Your Doorstep'
  },
  {
    desktop: '/hero-slide-2-desktop.jpg',
    mobile: '/hero-slide-2-mobile.jpg',
    alt: 'FarmyCure Premium Banner - Let\'s Grow Together'
  },
  {
    desktop: '/hero-slide-3-desktop.jpg',
    mobile: '/hero-slide-3-mobile.jpg',
    alt: 'FarmyCure Premium Banner - Goodness Delivered, Trust Assured'
  }
]

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1.0, ease: 'easeInOut' }
  },
  slide: {
    initial: { x: '100%', opacity: 1 },
    animate: { x: '0%', opacity: 1 },
    exit: { x: '-100%', opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  kenburns: {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1.0 },
    exit: { opacity: 0 },
    transition: { duration: 1.2, ease: 'easeInOut' }
  }
}

const HeroSection = () => {
  const [searchVal, setSearchVal] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [transitionType, setTransitionType] = useState('fade') // 'fade' | 'slide' | 'kenburns'
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  return (
    <section className="relative w-full h-[35vh] sm:h-[40vh] md:h-[48vh] lg:h-[52vh] min-h-[260px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[460px] mt-[34px] bg-[#07140e] overflow-hidden select-none">
      
      {/* CSS Ambient Animations */}
      <style>{`
        @keyframes float-leaf-1 {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(80vh) translateX(-120px) rotate(180deg); opacity: 0; }
        }
        @keyframes float-leaf-2 {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.5; }
          85% { opacity: 0.5; }
          100% { transform: translateY(80vh) translateX(150px) rotate(-130deg); opacity: 0; }
        }
        @keyframes float-particle {
          0% { transform: translateY(85vh) translateX(0) scale(0.8); opacity: 0; }
          25% { opacity: 0.35; }
          75% { opacity: 0.35; }
          100% { transform: translateY(-10vh) translateX(40px) scale(1.2); opacity: 0; }
        }
        @keyframes sunlight-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.1); }
        }
      `}</style>

      {/* EDGE-TO-EDGE HERO BACKGROUND: Proper cover layout for a real e-commerce banner */}
      <div className="absolute inset-0 w-full h-full select-none overflow-hidden bg-[#07140e] z-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentIdx}
            initial={variants[transitionType].initial}
            animate={variants[transitionType].animate}
            exit={variants[transitionType].exit}
            transition={variants[transitionType].transition}
            className="absolute inset-0 w-full h-full"
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={slides[currentIdx].mobile} />
              <img 
                src={slides[currentIdx].desktop} 
                alt={slides[currentIdx].alt} 
                className="w-full h-full object-cover object-top pointer-events-none" 
              />
            </picture>
          </motion.div>
        </AnimatePresence>
        {/* Soft, premium gradient overlay to darken the right side for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#07140e]/10 to-[#07140e]/65 z-10 pointer-events-none" />
        {/* Left side overlay to make sure text baked into slides is highly visible and contrasty on desktop */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07140e]/5 to-[#07140e]/40 z-10 pointer-events-none" />
        {/* Bottom subtle shadow transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07140e]/55 to-transparent z-10 pointer-events-none" />
      </div>

      {/* TEXT OVERLAY: Positioned within the app's safe container, right-aligned, minimal and clean */}
      <Container className="relative h-full flex items-center justify-end z-20 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-[220px] sm:max-w-sm md:max-w-md text-right flex flex-col items-end pr-2 md:pr-0 pointer-events-auto"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#95D5B2] uppercase mb-1 block select-none">
            Shop the
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            Farm Products
          </h1>

          <p className="hidden md:block text-[9.5px] sm:text-[11px] md:text-xs text-gray-200/90 font-body max-w-xs sm:max-w-sm mt-2 leading-relaxed drop-shadow-sm">
            Discover premium organic vegetables, dairy, honey, and grains sourced directly from local, sustainable farms.
          </p>
          <div className="mt-3 md:mt-4.5 flex gap-3">
            <button
              onClick={() => navigate('/shop')}
              className="px-3.5 py-2 md:px-5 md:py-2.5 bg-[#1B4332] hover:bg-[#2d5c48] text-white font-semibold text-[9.5px] md:text-[11px] rounded-full shadow-[0_4px_14px_rgba(27,67,50,0.35)] transition-all duration-300 transform active:scale-98 border border-[#2d5c48]"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hidden md:block px-4.5 py-2 md:px-5 md:py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-[9.5px] md:text-[11px] rounded-full backdrop-blur-md transition-all duration-300 border border-white/20"
            >
              Our Story
            </button>
          </div>
        </motion.div>
      </Container>

      {/* Ambient Animations Layer */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {/* Sunlight Glow Effect (Top Right) */}
        <div 
          className="absolute top-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-amber-100/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none"
          style={{ animation: 'sunlight-glow 9s infinite ease-in-out' }}
        />

        {/* Floating Leaves */}
        <LeafIcon className="absolute w-4 h-4" style={{ left: '15%', animation: 'float-leaf-1 14s infinite ease-in-out 1s' }} />
        <LeafIcon className="absolute w-5 h-5" style={{ left: '45%', animation: 'float-leaf-2 17s infinite ease-in-out 3s' }} />
        <LeafIcon className="absolute w-4 h-4" style={{ left: '70%', animation: 'float-leaf-1 15s infinite ease-in-out 0s' }} />
        <LeafIcon className="absolute w-5 h-5" style={{ left: '85%', animation: 'float-leaf-2 20s infinite ease-in-out 5s' }} />

        {/* Rising Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${10 + i * 16}%`,
              animation: `float-particle ${11 + i * 3}s infinite linear`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Dynamic Transition Switcher (Floating Dev Pill) */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white select-none scale-90 sm:scale-100 transition-all shadow-lg hover:bg-black/60">
        <span className="text-[9px] font-bold tracking-wider text-white/50 uppercase mr-1 pl-1">Transition:</span>
        {['fade', 'slide', 'kenburns'].map((t) => (
          <button
            key={t}
            onClick={() => setTransitionType(t)}
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase transition-all ${
              transitionType === t
                ? 'bg-[#1B4332] text-white border border-[#2d5c48] shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {t === 'kenburns' ? 'Ken Burns' : t}
          </button>
        ))}
      </div>

    </section>
  )
}

export default HeroSection
