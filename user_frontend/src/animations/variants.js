export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: 'easeOut' },
}

export const hoverLift = {
  y: -8,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  transition: { duration: 0.3, ease: 'easeOut' },
}

export const floatingLeaf = {
  initial: { opacity: 0, y: 0, rotate: 0 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, -100, -200, -300],
    x: [0, 30, -20, 40],
    rotate: [0, 45, -30, 60],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const splashExit = {
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
}

export const slideInRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}
