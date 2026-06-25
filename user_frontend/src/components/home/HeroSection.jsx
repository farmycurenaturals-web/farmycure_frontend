import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full bg-[#F8F6F1] py-8 lg:py-16 mt-[34px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-4 md:space-y-6 order-2 lg:order-1 animate-fade-up">
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-body tracking-[0.25em] text-burnt-orange font-semibold uppercase">
                Farm Fresh
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-forest font-bold leading-[1.15]">
                Delivered Daily
              </h1>
            </div>
            
            <p className="font-body text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
              Experience the purity of farm-to-table organic products. Handpicked, naturally grown, and delivered fresh to nourish your family every day.
            </p>
            
            <button
              onClick={() => navigate('/shop')}
              className="mt-2 px-8 py-3.5 bg-forest text-white font-medium text-sm rounded-full hover:bg-forest/90 hover:shadow-lg transition-all duration-300 w-fit flex items-center gap-2 group"
            >
              Shop Now
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200/50 bg-white p-2 hover:shadow-xl transition-shadow duration-500 hover-zoom">
              <img 
                src="/hero-new-desktop.jpg" 
                alt="Farmycure - Premium Organic Products" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection

