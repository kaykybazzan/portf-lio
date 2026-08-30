'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
}

export default function TextReveal({ text, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 20, filter: 'blur(4px)' }
            }
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1], // Easing cúbico extremamente suave
              delay: i * 0.025,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}