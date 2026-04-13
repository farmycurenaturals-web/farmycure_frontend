import { motion } from 'framer-motion'

const leaves = [
  { id: 1, x: '10%', delay: 0, duration: 10, size: 24 },
  { id: 2, x: '25%', delay: 2, duration: 12, size: 20 },
  { id: 3, x: '40%', delay: 1, duration: 11, size: 28 },
  { id: 4, x: '60%', delay: 3, duration: 13, size: 22 },
  { id: 5, x: '75%', delay: 0.5, duration: 10, size: 26 },
  { id: 6, x: '90%', delay: 2.5, duration: 12, size: 18 },
]

const FloatingLeaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-sage/30"
          style={{ left: leaf.x, bottom: '-10%' }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [0, -800, -1600],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 45, -30, 60],
            x: [0, 30, -20, 40],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingLeaves
