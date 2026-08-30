'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const isPrimary = variant === 'primary'

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden rounded-full border px-8 py-4 text-sm md:text-base font-normal cursor-pointer inline-block transition-colors duration-300 ${
        isPrimary
          ? 'border-white bg-white text-black'
          : 'border-white/20 bg-white/5 backdrop-blur-md text-white hover:border-white/40'
      } ${className}`}
    >
      {/* Cortina diagonal fluida */}
      <motion.div
        initial={{ y: '100%', x: '-100%' }}
        animate={{
          y: isHovered ? '0%' : '100%',
          x: isHovered ? '0%' : '-100%',
        }}
        transition={{
          duration: 0.65,
          ease: [0.25, 1, 0.5, 1],
        }}
        className={`absolute inset-0 rounded-full pointer-events-none ${
          isPrimary ? 'bg-zinc-900' : 'bg-white'
        }`}
      />

      {/* Conteúdo do Botão com transição de cor impecável */}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isPrimary
            ? isHovered
              ? 'text-white'
              : 'text-black'
            : isHovered
              ? 'text-black font-medium'
              : 'text-white'
        }`}
      >
        {children}
      </span>
    </motion.button>
  )
}