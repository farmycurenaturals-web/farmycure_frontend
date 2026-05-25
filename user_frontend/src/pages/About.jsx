import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from '../components/ui/Container'

// Icon components for research panels to add visual polish
const ScienceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
  </svg>
)

const ResearchCarousel = ({ panels }) => {
  const containerRef = useRef(null)

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -380, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 380, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative group">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-2 hide-scrollbar scroll-smooth"
      >
        {panels.map((panel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="w-[85vw] sm:w-[340px] md:w-[380px] shrink-0 snap-start glass-card rounded-[24px] p-6 md:p-8 border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1f4d36]/5 text-[#1f4d36] flex items-center justify-center mb-6">
                <ScienceIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight font-heading">
                {panel.title}
              </h3>
              <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-body">
                {panel.content}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100/50 flex items-center justify-between text-[#1f4d36] font-semibold text-[13px]">
              <span>Research Initiative</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Premium Desktop Navigation Arrows */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 -right-4 justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={scrollLeft} 
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-md border border-gray-100/50 flex items-center justify-center text-gray-600 hover:text-[#1f4d36] pointer-events-auto hover:scale-110 active:scale-95 transition-all -translate-x-2"
          aria-label="Scroll Left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button 
          onClick={scrollRight} 
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-md border border-gray-100/50 flex items-center justify-center text-gray-600 hover:text-[#1f4d36] pointer-events-auto hover:scale-110 active:scale-95 transition-all translate-x-2"
          aria-label="Scroll Right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  )
}

const FeatureCard = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    whileHover={{ scale: 1.02, y: -2 }}
    className="bg-white/80 backdrop-blur rounded-[20px] border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(31,77,54,0.05)] hover:border-[#1f4d36]/20 transition-all duration-300 flex items-start gap-4 h-full"
  >
    <div className="w-8 h-8 rounded-xl bg-[#1f4d36]/5 text-[#1f4d36] flex flex-shrink-0 items-center justify-center mt-0.5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
    </div>
    <span className="text-[14px] md:text-[15px] font-medium text-gray-800 leading-snug font-body">{text}</span>
  </motion.div>
)

const FadeUpText = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
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
    <main className="min-h-screen bg-[#FBFBF9] font-sans selection:bg-[#1f4d36] selection:text-white pb-16">
      <Helmet>
        <title>Farmycure Research | Hybrid Agricultural Technology</title>
        <meta name="description" content="Discover Farmycure's Hybrid Agricultural Technology driving precision agriculture research, livestock innovation, soil health engineering, and sustainable farming solutions." />
      </Helmet>

      {/* Cinematic Parallax Hero Section */}
      <section className="relative h-[55vh] md:h-[65vh] min-h-[450px] max-h-[650px] flex items-start bg-[#07140e] overflow-hidden pt-16">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000" 
            alt="Agriculture Background" 
            className="w-full h-full object-cover mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07140e] via-[#07140e]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBF9]/1 from-[0%] via-[#07140e]/90 via-[20%] to-[#07140e]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-[760px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-[#a3c9b3] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                Science-Led. Technology-Driven. Future-Ready.
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2.5rem,5.5vw,4.2rem)] font-bold text-white mb-4 leading-[1.08] tracking-tight font-heading"
            >
              Farmycure Research
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[16px] md:text-[20px] text-white/90 mb-8 font-medium leading-relaxed font-body max-w-[650px]"
            >
              Engineering the Future of Agriculture with Hybrid Agricultural Technology (HAT)
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 text-white/70 text-[14px] md:text-[15px] leading-relaxed max-w-[680px] font-body"
            >
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

              <p className="text-white/95 font-medium border-l-2 border-[#a3c9b3] pl-4 italic">
                As a leader in Agri-Tech Innovation India, Farmycure is building practical
                Future Farming Solutions for a rapidly evolving global food ecosystem.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* About HAT Section */}
      <section className="py-20 md:py-28 bg-[#FBFBF9]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <FadeUpText>
                <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">System Architecture</span>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-6 tracking-tight leading-[1.15] font-heading">
                  About HAT – Hybrid Agricultural Technology
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-6 leading-relaxed font-body">
                  Hybrid Agricultural Technology (HAT) is Farmycure's integrated research
                  platform combining engineering systems design, computational modelling,
                  biological sciences, and agricultural field analytics. HAT is not a single
                  intervention — it is a system architecture.
                </p>
              </FadeUpText>

              <FadeUpText delay={0.15}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-8 leading-relaxed font-body">
                  Through HAT, we design High Yield Crop Systems, optimize livestock
                  performance, enhance soil regeneration, and improve farm-level
                  resource efficiency.
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <div className="border-l-3 border-[#1f4d36] pl-6 py-1 bg-white p-6 rounded-r-2xl rounded-l-md border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
                  <p className="text-[15px] md:text-[16.5px] font-medium text-gray-900 leading-relaxed font-body">
                    HAT represents our commitment to Sustainable Farming Innovation
                    grounded in scientific rigor and practical scalability.
                  </p>
                </div>
              </FadeUpText>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hatFeatures.map((feature, index) => (
                <FeatureCard key={index} text={feature} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Livestock Research Technology */}
      <section className="py-20 md:py-28 bg-white border-y border-gray-100 px-1 overflow-hidden">
        <Container>
          <FadeUpText className="mb-10">
             <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Research Area</span>
             <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight font-heading">
               Livestock Research Technology
             </h2>
          </FadeUpText>
          <ResearchCarousel panels={livestockPanels} />
        </Container>
      </section>

      {/* Organic Grains Research */}
      <section className="py-20 md:py-28 bg-[#FBFBF9] px-1 overflow-hidden">
        <Container>
          <FadeUpText className="mb-10">
             <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Research Area</span>
             <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight font-heading">
               Organic Grains Research
             </h2>
          </FadeUpText>
          <ResearchCarousel panels={grainsPanels} />
        </Container>
      </section>

      {/* Horticulture and Cash Crop Research */}
      <section className="py-20 md:py-28 bg-white border-y border-gray-100 px-1 overflow-hidden">
        <Container>
          <FadeUpText className="mb-10">
             <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Research Area</span>
             <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight font-heading">
               Horticulture and Cash Crop Research
             </h2>
          </FadeUpText>
          <ResearchCarousel panels={horticulturePanels} />
        </Container>
      </section>

      {/* Soil Research & Regeneration Engineering */}
      <section className="py-20 md:py-28 bg-[#FBFBF9]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <FadeUpText>
                <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Foundation</span>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-6 tracking-tight leading-[1.15] font-heading">
                  Soil Research & Regeneration Engineering
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-6 leading-relaxed font-body">
                  Healthy soil is the foundation of long-term agricultural sustainability.
                  Farmycure's Soil Health Engineering framework integrates:
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <div className="mt-8">
                  <p className="text-[15px] md:text-[16px] font-medium text-[#1f4d36] leading-relaxed bg-[#1f4d36]/5 p-6 rounded-2xl border border-[#1f4d36]/10 font-body">
                    By combining laboratory analytics with field-level data intelligence, we develop scalable soil recovery models that sustain productivity over generations.
                  </p>
                </div>
              </FadeUpText>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {soilPoints.map((point, index) => (
                <FeatureCard key={index} text={point} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Our Research Team */}
      <section className="py-20 md:py-28 bg-[#07140e] relative overflow-hidden rounded-[40px] mx-4 md:mx-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(31,77,54,0.3),transparent_60%)]" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeUpText>
                <span className="text-[#a3c9b3] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Ecosystem</span>
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white mb-6 tracking-tight font-heading">
                  Our Research Team
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16.5px] text-white/80 mb-6 leading-relaxed font-body">
                  Farmycure's research ecosystem is built by a multidisciplinary team integrating engineering precision with agricultural expertise.
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <p className="text-[15px] md:text-[16.5px] text-white/95 font-medium leading-relaxed font-body border-l-2 border-[#a3c9b3]/40 pl-6 italic">
                  Together, they design and validate high-efficiency farming systems under the HAT architecture. The team operates with a systems-thinking approach — transforming traditional agriculture into a measurable, optimizable, and scalable technology platform.
                </p>
              </FadeUpText>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap gap-3 md:gap-4 justify-start lg:justify-end">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    className="bg-white/10 backdrop-blur-md rounded-full px-5 py-3 border border-white/15 text-white text-[13.5px] font-semibold tracking-wide shadow-sm"
                  >
                    {member}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Founder & Innovator */}
      <section className="py-20 md:py-28 bg-[#FBFBF9]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8">
              <FadeUpText>
                <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Leadership</span>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-2 tracking-tight font-heading">
                  Founder & Innovator
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-6 font-heading">
                  Dr. Maneesh Kumar Singh
                </h3>
              </FadeUpText>

              <FadeUpText delay={0.1}>
                <div className="mb-8 px-6 py-4 bg-[#1f4d36]/5 rounded-2xl border border-[#1f4d36]/10 inline-block">
                  <p className="text-[13.5px] md:text-[14.5px] font-bold text-[#1f4d36] leading-relaxed font-body">
                    Founder & Innovator of Hybrid Agricultural Technology (HAT)<br />
                    Chief System Design and Testing Engineer
                  </p>
                </div>
              </FadeUpText>

              <div className="space-y-6 text-[15px] md:text-[16px] text-gray-600 leading-relaxed font-body max-w-[720px]">
                <FadeUpText delay={0.15}>
                  <p>
                    Dr. Maneesh Kumar Singh received his PhD degree from Department of Electrical Engineering, Computing & Mathematical Sciences, Curtin University, Perth Australia. He has more than 10 years of research oriented teaching experiences from reputed Institutions, i.e., National Institute of Technology (NIT) Hamirpur, National Institute of Technology (NIT) Delhi, as well as Jawaharlal Nehru University (JNU) Delhi. His main research focus is with extensive expertise in system design, computational modelling, and engineering innovation, his research background spans complex system architecture, mathematical optimization, and advanced technology development.
                  </p>
                </FadeUpText>

                <FadeUpText delay={0.2}>
                  <p className="font-bold text-gray-900 border-l-2 border-[#1f4d36] pl-4 italic">
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
                     <p className="text-[15px] font-semibold text-gray-900">
                        Contact: <a href="mailto:md@farmycure.com" className="text-[#1f4d36] hover:underline font-bold">md@farmycure.com</a>
                     </p>
                  </div>
                </FadeUpText>
              </div>
            </div>

            <div className="lg:col-span-4 w-full">
               <FadeUpText delay={0.2}>
                  <div className="w-full aspect-[4/5] rounded-[32px] bg-gradient-to-br from-[#1f4d36] to-[#0c2317] shadow-xl flex flex-col items-center justify-between p-8 text-center relative overflow-hidden group border border-[#1f4d36]/20">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
                     <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                     
                     <div className="w-full flex justify-end">
                       <span className="text-[10px] text-white/50 border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest font-semibold backdrop-blur-sm">Executive Office</span>
                     </div>

                     <div className="flex flex-col items-center">
                       <div className="w-20 h-20 rounded-[24px] bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-inner backdrop-blur-md">
                          <svg className="w-10 h-10 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                       </div>
                       <p className="text-xl font-bold text-white tracking-tight font-heading">Dr. Maneesh Kumar Singh</p>
                       <p className="text-[12px] text-white/60 font-medium tracking-wide mt-1 font-body">Curtin University PhD Alumnus</p>
                     </div>
                     
                     <a 
                       href="mailto:md@farmycure.com" 
                       className="bg-white text-[#1f4d36] py-3.5 rounded-2xl text-[14px] font-bold hover:bg-[#F4F3EF] transition-all duration-300 w-full shadow-md active:scale-[0.98] block"
                     >
                        Contact Me
                     </a>
                  </div>
               </FadeUpText>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Farmycure Research Matters */}
      <section className="py-20 md:py-28 bg-[#FBFBF9] border-t border-gray-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <FadeUpText>
                <span className="text-[#1f4d36] text-[11px] font-bold uppercase tracking-[0.15em] mb-3 block">Mission</span>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-6 tracking-tight leading-[1.15] font-heading">
                  Why Farmycure Research Matters
                </h2>
              </FadeUpText>
              
              <FadeUpText delay={0.1}>
                <p className="text-[15px] md:text-[16px] text-gray-600 mb-8 leading-relaxed font-body">
                  Global agriculture faces increasing pressure from climate variability, soil degradation, and rising food demand. Farmycure's research addresses:
                </p>
              </FadeUpText>

              <FadeUpText delay={0.2}>
                <p className="text-[16.5px] md:text-[18px] font-bold text-[#1f4d36] leading-relaxed max-w-[600px] border-l-3 border-[#1f4d36] pl-6 font-body">
                  Our mission is not incremental improvement — it is systemic agricultural transformation grounded in science.
                </p>
              </FadeUpText>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyFarmycurePoints.map((point, index) => (
                <FeatureCard key={index} text={point} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Explore the Future of Farming - Final CTA */}
      <section className="py-24 bg-[#1f4d36] text-center relative overflow-hidden rounded-[32px] mx-4 md:mx-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <Container className="relative z-10">
          <FadeUpText>
             <h2 className="text-[2.2rem] md:text-[3.5rem] font-bold text-white mb-6 tracking-tight leading-tight font-heading">
               Explore the Future of Farming
             </h2>
          </FadeUpText>

          <FadeUpText delay={0.1}>
             <p className="text-[16px] md:text-[18px] text-white/80 mb-8 leading-relaxed max-w-[650px] mx-auto font-body">
               Farmycure Research represents a new model of Hybrid Agricultural Technology, combining engineering precision with biological intelligence.
             </p>
          </FadeUpText>

          <FadeUpText delay={0.2}>
             <p className="text-[16px] md:text-[19px] font-bold text-white font-body tracking-wide">
               Explore the Future of Farming with Farmycure.
             </p>
          </FadeUpText>
        </Container>
      </section>

    </main>
  )
}

export default About
