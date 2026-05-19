import { motion } from 'framer-motion'
import { hoverLift } from '../../animations/variants'

export const Card = ({
  children,
  className = '',
  hoverable = true,
  onClick,
}) => {
  const CardWrapper = hoverable ? motion.div : 'div'

  return (
    <CardWrapper
      onClick={onClick}
      whileHover={hoverable ? hoverLift : undefined}
      className={`
        bg-white
        rounded-2xl
        shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-gray-100/60
        overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </CardWrapper>
  )
}
