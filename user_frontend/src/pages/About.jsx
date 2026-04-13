import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

const ResearchSlider = ({ panels }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % panels.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, panels.length])

  return (
    <div
      ref={containerRef}
      className="max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 transition-shadow duration-300 hover:shadow-lg">
        <div className="overflow-hidden relative">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {panels.map((panel, index) => (
              <div
                key={index}
                className="min-w-full flex-shrink-0"
              >
                <h3 className="text-2xl font-bold text-[#1f4d36] mb-6 text-center">
                  {panel.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                  {panel.content}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {panels.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'bg-[#1f4d36] w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

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
    <main className="min-h-screen">
      <Helmet>
        <title>Farmycure Research | Hybrid Agricultural Technology</title>
        <meta name="description" content="Discover Farmycure's Hybrid Agricultural Technology driving precision agriculture research, livestock innovation, soil health engineering, and sustainable farming solutions." />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="w-full px-4 md:px-10 py-12">
          <div className="w-full bg-black/50 backdrop-blur-md p-6 md:p-10 rounded-lg text-white">

            <motion.h1
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-semibold mb-4"
            >
              Farmycure Research
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 mt-4 leading-relaxed"
            >
              Engineering the Future of Agriculture with Hybrid Agricultural Technology (HAT)
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-200 mt-4 leading-relaxed font-semibold"
            >
              Science-Led. Technology-Driven. Future-Ready.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 text-gray-200 text-lg mt-4 leading-relaxed"
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

              <p>
                As a leader in Agri-Tech Innovation India, Farmycure is building practical
                Future Farming Solutions for a rapidly evolving global food ecosystem.
              </p>
            </motion.div>

          </div>
        </div>
      </section>


      {/* About HAT Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
          >
            About HAT – Hybrid Agricultural Technology
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-16"
          >
            Hybrid Agricultural Technology (HAT) is Farmycure's integrated research
            platform combining engineering systems design, computational modelling,
            biological sciences, and agricultural field analytics. HAT is not a single
            intervention — it is a system architecture.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {hatFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-[#1f4d36]">
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-8"
          >
            Through HAT, we design High Yield Crop Systems, optimize livestock
            performance, enhance soil regeneration, and improve farm-level
            resource efficiency.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-[#1f4d36] text-center"
          >
            HAT represents our commitment to Sustainable Farming Innovation
            grounded in scientific rigor and practical scalability.
          </motion.p>

        </div>
      </section>


      {/* Livestock Research Technology */}
      <section className="py-12 bg-white px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-4 text-center"
        >
          Livestock Research Technology
        </motion.h2>
        <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

        <ResearchSlider panels={livestockPanels} />
      </section>


      {/* Organic Grains Research */}
      <section className="py-12 bg-[#f3f7f4] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-4 text-center"
        >
          Organic Grains Research
        </motion.h2>
        <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

        <ResearchSlider panels={grainsPanels} />
      </section>


      {/* Horticulture and Cash Crop Research */}
      <section className="py-12 bg-white px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-4 text-center"
        >
          Horticulture and Cash Crop Research
        </motion.h2>
        <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

        <ResearchSlider panels={horticulturePanels} />
      </section>


      {/* Soil Research & Regeneration Engineering */}
      <section className="py-20 bg-[#f3f7f5] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-6 text-center"
          >
            Soil Research & Regeneration Engineering
          </motion.h2>
          <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12"
          >
            Healthy soil is the foundation of long-term agricultural sustainability.
            Farmycure's Soil Health Engineering framework integrates:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {soilPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <p className="text-gray-700 font-medium">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto"
          >
            By combining laboratory analytics with field-level data intelligence, we develop scalable soil recovery models that sustain productivity over generations.
          </motion.p>
        </div>
      </section>


      {/* Our Research Team */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-6 text-center"
          >
            Our Research Team
          </motion.h2>
          <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-8"
          >
            Farmycure's research ecosystem is built by a multidisciplinary team integrating engineering precision with agricultural expertise.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:3 cols-2 gap-4 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="text-gray-800 font-semibold text-center">{member}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto mt-12"
          >
            Together, they design and validate high-efficiency farming systems under the HAT architecture. The team operates with a systems-thinking approach — transforming traditional agriculture into a measurable, optimizable, and scalable technology platform.
          </motion.p>
        </div>
      </section>


      {/* Founder & Innovator */}
      <section className="py-20 bg-[#f3f7f5] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-6 text-center"
          >
            Founder & Innovator
          </motion.h2>
          <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[#1f4d36] mb-2">
                Dr. Maneesh Kumar Singh
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Founder & Innovator of Hybrid Agricultural Technology (HAT)<br />
                Chief System Design and Testing Engineer
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Dr. Maneesh Kumar Singh received his PhD degree from Department of Electrical Engineering, Computing & Mathematical Sciences, Curtin University, Perth Australia. He has more than 10 years of research oriented teaching experiences from reputed Institutions, i.e., National Institute of Technology (NIT) Hamirpur, National Institute of Technology (NIT) Delhi, as well as Jawaharlal Nehru University (JNU) Delhi. His main research focus is with extensive expertise in system design, computational modelling, and engineering innovation, his research background spans complex system architecture, mathematical optimization, and advanced technology development.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                His vision for Farmycure is clear: integrate engineering intelligence into agriculture to create predictive, resilient, and scalable farming ecosystems.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Under his leadership, HAT has evolved into a structured technological framework that bridges core engineering principles with biological and agricultural sciences — establishing Farmycure as a serious contributor to Future Farming Solutions globally.
              </p>

              <p className="mt-6 text-gray-700">
                Contact: <span className="font-medium">md@farmycure.com</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1f4d36] to-[#2d6a4f] rounded-2xl h-[400px] flex items-center justify-center"
            >
              <div className="text-center text-white/80">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <p className="text-lg font-medium">Farmycure Research</p>
              </div>
            </motion.div>
          </div>

          <div className="my-10 border-t border-gray-200 pt-8 flex justify-center">
            <button className="bg-[#1f4d36] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#173c2b] transition">
              Contact Me
            </button>
          </div>
        </div>
      </section>


      {/* Why Farmycure Research Matters */}
      <section className="py-20 bg-[#e8f0ec] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-6 text-center"
          >
            Why Farmycure Research Matters
          </motion.h2>
          <div className="w-12 h-0.5 bg-[#1f4d36] mx-auto mb-10" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12"
          >
            Global agriculture faces increasing pressure from climate variability, soil degradation, and rising food demand.
            Farmycure's research addresses:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyFarmycurePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <p className="text-gray-700 font-medium">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-[#1f4d36] text-center mt-12"
          >
            Our mission is not incremental improvement — it is systemic agricultural transformation grounded in science.
          </motion.p>
        </div>
      </section>


      {/* Explore the Future of Farming - Final CTA */}
      <section className="py-20 bg-[#1f4d36] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Explore the Future of Farming
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Farmycure Research represents a new model of Hybrid Agricultural Technology, combining engineering precision with biological intelligence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/90 mb-10"
          >
            Explore the Future of Farming with Farmycure.
          </motion.p>
        </div>
      </section>

    </main>
  )
}

export default About
