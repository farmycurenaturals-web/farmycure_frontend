import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const ResearchCarousel = ({ panels }) => {
  const containerRef = useRef(null)

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative group">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 pt-2 hide-scrollbar scroll-smooth"
      >
        {panels.map((panel, index) => (
          <div
            key={index}
            className="w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 snap-start bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1f4d36]/5 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#1f4d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <h3 className="text-[1.1rem] md:text-[1.25rem] font-bold text-gray-900 mb-3 tracking-tight">
              {panel.title}
            </h3>
            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed flex-1">
              {panel.content}
            </p>
          </div>
        ))}
      </div>
      
      {/* Desktop Navigation Arrows */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#1f4d36] pointer-events-auto hover:scale-105 transition-transform -translate-x-5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#1f4d36] pointer-events-auto hover:scale-105 transition-transform translate-x-5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  )
}

const FeatureCard = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 flex items-start gap-3 h-full"
  >
    <div className="w-8 h-8 rounded-full bg-[#1f4d36]/5 text-[#1f4d36] flex flex-shrink-0 items-center justify-center mt-0.5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
    </div>
    <span className="text-[14px] md:text-[15px] font-medium text-gray-800 leading-snug">{text}</span>
  </motion.div>
)

const FadeUpText = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

const About = () => {
  const hatFeatures = [
    "Advanced system engineering",
    "Data-driven farm modelling",
    "Environmental control frameworks",
    "Soil health engineering",
    "Precision livestock and crop optimization"
  ]

  const soilPoints = [
    "Soil microbiome profiling",
    "Precision nutrient mapping",
    "Organic carbon regeneration models",
    "Biological activity enhancement systems",
    "Long-term regenerative agriculture strategies"
  ]

  const teamMembers = [
    "Agricultural Scientists",
    "System Design Engineers",
    "Data Scientists",
    "Field Research Specialists",
    "Veterinary Experts"
  ]

  const whyFarmycurePoints = [
    "Food security through high-efficiency systems",
    "Climate resilience via adaptive agricultural design",
    "Sustainable rural development through technology integration",
    "Scalable agri-tech innovation for global adoption"
  ]

  const livestockPanels = [
    {
      title: "Goat Farming Systems",
      content: "Farmycure's goat farming systems are engineered using performance analytics, adaptive feed optimization models, and environmental regulation frameworks. Our approach focuses on breed enhancement, mortality reduction, nutritional efficiency, and climate-controlled housing systems to improve productivity and long-term farm sustainability."
    },
    {
      title: "Kadaknath Chicken Farming",
      content: "Our Kadaknath research program integrates controlled breeding systems, nutrient profiling, disease resistance modelling, and scientific farm layout optimization. By combining indigenous breed preservation with modern agricultural engineering principles, we create high-value poultry systems designed for both scalability and resilience."
    },
    {
      title: "Fish and Shrimp Aquaculture",
      content: "Farmycure's aquaculture research emphasizes water quality engineering, feed conversion optimization, disease prevention modelling, and biosecure habitat design. Through data-driven aquatic ecosystem management, we enhance yield predictability while maintaining environmental balance and resource efficiency."
    }
  ]

  const grainsPanels = [
    {
      title: "Rice Research",
      content: "Farmycure's rice research focuses on soil nutrient calibration, water management systems, varietal performance analytics, and yield maximization strategies. Our engineered cultivation models ensure consistency in grain quality while maintaining sustainable agricultural practices."
    },
    {
      title: "Wheat Research",
      content: "Our wheat systems are built on precision irrigation frameworks, growth-stage nutrient modelling, and crop disease forecasting analytics. These research-led methodologies improve grain density, uniformity, and large-scale production efficiency."
    },
    {
      title: "Soybean Research",
      content: "Soybean cultivation research at Farmycure integrates protein yield optimization, soil health regeneration cycles, and adaptive climate-response modelling. Our approach strengthens crop resilience while maximizing commercial output potential."
    }
  ]

  const horticulturePanels = [
    {
      title: "Banana Farming Systems",
      content: "Farmycure's banana farming systems leverage tissue culture optimization, controlled irrigation architecture, disease resistance monitoring, and post-harvest engineering solutions. These integrated systems increase productivity while maintaining fruit quality standards."
    },
    {
      title: "Turmeric Research",
      content: "Our turmeric research combines soil mineral profiling, rhizome health analytics, and curcumin concentration optimization. Through scientific cultivation frameworks, we enhance both medicinal value and agricultural efficiency."
    },
    {
      title: "Ginger Research",
      content: "Ginger cultivation research incorporates moisture regulation systems, root disease prevention modelling, and nutrient absorption enhancement strategies. These precision agricultural techniques improve crop stability and yield performance."
    }
  ]

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-[#1f4d36] selection:text-white">
      <Helmet>
        <title>Farmycure Research | Hybrid Agricultural Technology</title>
        <meta name="description" content="Discover Farmycure's Hybrid Agricultural Technology driving precision agriculture research, livestock innovation, soil health engineering, and sustainable farming solutions." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[42vh] md:h-[60vh] min-h-[400px] max-h-[600px] flex items-center bg-[#0a1a12] overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000" 
            alt="Agriculture Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a12] via-[#0a1a12]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a12] to-transparent opacity-80" />
        </div>

        <div className="w-full px-5 md:px-10 lg:px-[80px] xl:px-[120px] relative z-10 max-w-[1440px] mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[700px]"
          >
            <span className="inline-block text-[#a3c9b3] text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] mb-4 md:mb-6">
              Science-Led. Technology-Driven. Future-Ready.
            </span>

            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Farmycure Research
            </h1>

            <p className="text-[1rem] md:text-[1.25rem] text-white/90 mb-6 md:mb-8 font-medium leading-snug">
              Engineering the Future of Agriculture with Hybrid Agricultural Technology (HAT)
            </p>

            <div className="space-y-4 md:space-y-5 text-white/70 text-[14px] md:text-[16px] leading-relaxed max-w-[650px]">
              <p>
                At Farmycure, research is not an extension of farming — it is the foundation.
                Through our proprietary Hybrid Agricultural Technology (HAT) framework,
                we are redefining how livestock, crops, and soil systems are designed,
                optimized, and sustained.
              </p>

              <p>
                We operate at the intersection of engineering intelligence, biological systems,
                and precision agriculture research to develop scalable, data-driven,
                and climate-resilient farming models.
              </p>

              <p className="text-white/90 font-medium">
                As a leader in Agri-Tech Innovation India, Farmycure is building practical
                Future Farming Solutions for a rapidly evolving global food ecosystem.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About HAT Section */}
      <section className="py-16 md:py-24 bg-white px-5 md:px-10 lg:px-[80px] xl:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <FadeUpText>
                <span className="text-[#1f4d36] text-[12px] font-bold uppercase tracking-widest mb-3 block">System Architecture</span>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                  About HAT – Hybrid Agricultural Technology
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-6 leading-relaxed max-w-[700px]">
                  Hybrid Agricultural Technology (HAT) is Farmycure's integrated research
                  platform combining engineering systems design, computational modelling,
                  biological sciences, and agricultural field analytics. HAT is not a single
                  intervention — it is a system architecture.
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-6 leading-relaxed max-w-[700px]">
                  Through HAT, we design High Yield Crop Systems, optimize livestock
                  performance, enhance soil regeneration, and improve farm-level
                  resource efficiency.
                </p>
              </FadeUpText>

              <FadeUpText delay={0.3}>
                <div className="mt-8 border-l-2 border-[#1f4d36] pl-5 py-1">
                  <p className="text-[16px] md:text-[18px] font-medium text-gray-900 leading-relaxed max-w-[600px]">
                    HAT represents our commitment to Sustainable Farming Innovation
                    grounded in scientific rigor and practical scalability.
                  </p>
                </div>
              </FadeUpText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hatFeatures.map((feature, index) => (
                <FeatureCard key={index} text={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Livestock Research Technology */}
      <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-gray-100 px-5 md:px-10 lg:px-[80px] xl:px-[120px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <FadeUpText className="mb-8 md:mb-12">
             <span className="text-gray-400 text-[12px] font-bold uppercase tracking-widest mb-3 block">Research Area</span>
             <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight">
               Livestock Research Technology
             </h2>
          </FadeUpText>
          <ResearchCarousel panels={livestockPanels} />
        </div>
      </section>

      {/* Organic Grains Research */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 px-5 md:px-10 lg:px-[80px] xl:px-[120px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <FadeUpText className="mb-8 md:mb-12">
             <span className="text-gray-400 text-[12px] font-bold uppercase tracking-widest mb-3 block">Research Area</span>
             <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight">
               Organic Grains Research
             </h2>
          </FadeUpText>
          <ResearchCarousel panels={grainsPanels} />
        </div>
      </section>

      {/* Horticulture and Cash Crop Research */}
      <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-gray-100 px-5 md:px-10 lg:px-[80px] xl:px-[120px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <FadeUpText className="mb-8 md:mb-12">
             <span className="text-gray-400 text-[12px] font-bold uppercase tracking-widest mb-3 block">Research Area</span>
             <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight">
               Horticulture and Cash Crop Research
             </h2>
          </FadeUpText>
          <ResearchCarousel panels={horticulturePanels} />
        </div>
      </section>

      {/* Soil Research & Regeneration Engineering */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 px-5 md:px-10 lg:px-[80px] xl:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <FadeUpText>
                <span className="text-[#1f4d36] text-[12px] font-bold uppercase tracking-widest mb-3 block">Foundation</span>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                  Soil Research & Regeneration Engineering
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-6 leading-relaxed max-w-[700px]">
                  Healthy soil is the foundation of long-term agricultural sustainability.
                  Farmycure's Soil Health Engineering framework integrates:
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <div className="mt-8">
                  <p className="text-[15px] md:text-[16px] font-medium text-gray-900 leading-relaxed max-w-[600px] bg-[#f3f7f5] p-5 rounded-xl border border-green-50">
                    By combining laboratory analytics with field-level data intelligence, we develop scalable soil recovery models that sustain productivity over generations.
                  </p>
                </div>
              </FadeUpText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {soilPoints.map((point, index) => (
                <FeatureCard key={index} text={point} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Team */}
      <section className="py-16 md:py-24 bg-[#0a1a12] px-5 md:px-10 lg:px-[80px] xl:px-[120px] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeUpText>
                <span className="text-green-400 text-[12px] font-bold uppercase tracking-widest mb-3 block">Ecosystem</span>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-6 tracking-tight leading-tight">
                  Our Research Team
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-white/80 mb-6 leading-relaxed max-w-[700px]">
                  Farmycure's research ecosystem is built by a multidisciplinary team integrating engineering precision with agricultural expertise.
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <p className="text-[15px] md:text-[16px] text-white/90 font-medium leading-relaxed max-w-[700px]">
                  Together, they design and validate high-efficiency farming systems under the HAT architecture. The team operates with a systems-thinking approach — transforming traditional agriculture into a measurable, optimizable, and scalable technology platform.
                </p>
              </FadeUpText>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10 text-white text-[14px] font-medium"
                >
                  {member}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Innovator */}
      <section className="py-16 md:py-24 bg-white px-5 md:px-10 lg:px-[80px] xl:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-8">
              <FadeUpText>
                <span className="text-[#1f4d36] text-[12px] font-bold uppercase tracking-widest mb-3 block">Leadership</span>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 mb-2 tracking-tight">
                  Founder & Innovator
                </h2>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-medium text-gray-700 mb-6">
                  Dr. Maneesh Kumar Singh
                </h3>
              </FadeUpText>

              <FadeUpText delay={0.1}>
                <div className="mb-8 p-4 bg-[#f3f7f5] rounded-xl border border-green-50 inline-block">
                  <p className="text-[14px] md:text-[15px] font-medium text-[#1f4d36] leading-snug">
                    Founder & Innovator of Hybrid Agricultural Technology (HAT)<br />
                    Chief System Design and Testing Engineer
                  </p>
                </div>
              </FadeUpText>

              <div className="space-y-6 text-[15px] md:text-[16px] text-gray-600 leading-relaxed max-w-[700px]">
                <FadeUpText delay={0.15}>
                  <p>
                    Dr. Maneesh Kumar Singh received his PhD degree from Department of Electrical Engineering, Computing & Mathematical Sciences, Curtin University, Perth Australia. He has more than 10 years of research oriented teaching experiences from reputed Institutions, i.e., National Institute of Technology (NIT) Hamirpur, National Institute of Technology (NIT) Delhi, as well as Jawaharlal Nehru University (JNU) Delhi. His main research focus is with extensive expertise in system design, computational modelling, and engineering innovation, his research background spans complex system architecture, mathematical optimization, and advanced technology development.
                  </p>
                </FadeUpText>

                <FadeUpText delay={0.2}>
                  <p className="font-medium text-gray-900">
                    His vision for Farmycure is clear: integrate engineering intelligence into agriculture to create predictive, resilient, and scalable farming ecosystems.
                  </p>
                </FadeUpText>

                <FadeUpText delay={0.25}>
                  <p>
                    Under his leadership, HAT has evolved into a structured technological framework that bridges core engineering principles with biological and agricultural sciences — establishing Farmycure as a serious contributor to Future Farming Solutions globally.
                  </p>
                </FadeUpText>
                
                <FadeUpText delay={0.3}>
                  <div className="pt-4 flex items-center gap-4">
                     <p className="text-[15px] font-medium text-gray-900">
                        Contact: <a href="mailto:md@farmycure.com" className="text-[#1f4d36] hover:underline font-bold">md@farmycure.com</a>
                     </p>
                  </div>
                </FadeUpText>
              </div>
            </div>

            <div className="lg:col-span-4 w-full">
               <FadeUpText delay={0.2}>
                  <div className="w-full aspect-[4/5] rounded-[24px] bg-gradient-to-br from-[#1f4d36] to-[#123021] shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                     <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                     </div>
                     <p className="text-[1.25rem] font-bold text-white mb-8">Farmycure Research</p>
                     <button className="bg-white text-[#1f4d36] px-8 py-3 rounded-xl text-[14px] font-bold hover:bg-gray-50 transition-colors w-full">
                        Contact Me
                     </button>
                  </div>
               </FadeUpText>
            </div>
          </div>
        </div>
      </section>

      {/* Why Farmycure Research Matters */}
      <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-gray-100 px-5 md:px-10 lg:px-[80px] xl:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <FadeUpText>
                <span className="text-[#1f4d36] text-[12px] font-bold uppercase tracking-widest mb-3 block">Mission</span>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                  Why Farmycure Research Matters
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-8 leading-relaxed max-w-[700px]">
                  Global agriculture faces increasing pressure from climate variability, soil degradation, and rising food demand. Farmycure's research addresses:
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <p className="text-[1.1rem] md:text-[1.25rem] font-medium text-[#1f4d36] leading-relaxed max-w-[600px] border-l-2 border-[#1f4d36] pl-5">
                  Our mission is not incremental improvement — it is systemic agricultural transformation grounded in science.
                </p>
              </FadeUpText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyFarmycurePoints.map((point, index) => (
                <FeatureCard key={index} text={point} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore the Future of Farming - Final CTA */}
      <section className="py-24 bg-[#1f4d36] px-5 md:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <FadeUpText>
             <h2 className="text-[2rem] md:text-[3rem] font-bold text-white mb-6 tracking-tight leading-tight">
               Explore the Future of Farming
             </h2>
          </FadeUpText>

          <FadeUpText delay={0.1}>
             <p className="text-[16px] md:text-[18px] text-white/80 mb-8 leading-relaxed max-w-[600px] mx-auto">
               Farmycure Research represents a new model of Hybrid Agricultural Technology, combining engineering precision with biological intelligence.
             </p>
          </FadeUpText>

          <FadeUpText delay={0.2}>
             <p className="text-[16px] md:text-[18px] font-bold text-white">
               Explore the Future of Farming with Farmycure.
             </p>
          </FadeUpText>
        </div>
      </section>

    </main>
  )
}

export default About
