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
        rounded-card
        shadow-md
        overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </CardWrapper>
  )
}
