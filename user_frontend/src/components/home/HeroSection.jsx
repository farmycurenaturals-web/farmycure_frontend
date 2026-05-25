import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Container } from '../ui/Container'

const LeafIcon = ({ className, style }) => (
  <svg className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
    <path d="M17 8C8 14 3 21 3 21S10 16 19 10C21 9 22 7 22 5C22 3 20 2 18 2C16 2 13 4 17 8z" fill="#95D5B2" opacity="0.4" />
  </svg>
)

const HeroSection = () => {
  const [searchVal, setSearchVal] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  return (
    <section className="relative w-full h-[35vh] sm:h-[40vh] md:h-[48vh] lg:h-[52vh] min-h-[260px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[460px] bg-[#07140e] overflow-hidden select-none">
      
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
      <div className="absolute inset-0 w-full h-full select-none">
        <picture>
          <source media="(max-width: 768px)" srcSet="/new-hero-bg.jpg" />
          <img 
            src="/new-hero-bg.jpg" 
            alt="FarmyCure Premium Banner" 
            className="w-full h-full object-cover object-[30%_30%] md:object-[28%_25%] pointer-events-none" 
          />
        </picture>
        {/* Soft, premium gradient overlay to darken the right side for high text contrast while keeping the farmer on the left fully visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#07140e]/15 to-[#07140e]/75 z-10 pointer-events-none" />
        {/* Bottom subtle shadow transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07140e]/50 to-transparent z-10 pointer-events-none" />
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

    </section>
  )
}

export default HeroSection
