import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { fadeInUp, staggerContainer } from '../../animations/variants'

const trustItems = [
  {
    id: 1,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '100% Farm Fresh',
    description: 'Sourced directly from certified organic farms',
  },
  {
    id: 2,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'No Preservatives',
    description: 'Pure, natural products without any chemicals',
  },
  {
    id: 3,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure Payments',
    description: 'Safe and encrypted payment processing',
  },
]

const TrustSection = () => {
  return (
    <section className="py-16 md:py-20 bg-sage/10">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md text-forest mb-5">
                {item.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="font-body text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default TrustSection
