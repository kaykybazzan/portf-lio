'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FooterButtonProps {
  href: string
  children: React.ReactNode
}

export default function FooterButton({ href, children }: FooterButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.96 }}
      className="relative overflow-hidden rounded-full border border-zinc-700 px-8 py-4 text-sm md:text-base text-white font-light cursor-pointer inline-block"
    >
      {/* Cortina semitransparente que desliza na diagonal (baixo-esquerda para cima-direita) */}
      <motion.div
        initial={{ y: '100%', x: '-100%' }}
        animate={{
          y: isHovered ? '0%' : '100%',
          x: isHovered ? '0%' : '-100%',
        }}
        transition={{
          duration: 0.75,
          ease: [0.25, 1, 0.5, 1], // Deslize lento e fluido
        }}
        className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm pointer-events-none"
      />

      {/* Texto do botão */}
      <span className="relative z-10 transition-colors duration-500">
        {children}
      </span>
    </motion.a>
  )
}