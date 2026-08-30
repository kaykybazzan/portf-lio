'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const words = [
  "Olá",
  "Hellou",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "おい",
  "Hallå",
  "Guten tag",
  "Hallo"
]

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 300)
      return
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1)
    }, index === 0 ? 1000 : 180)

    return () => clearTimeout(timer)
  }, [index, onComplete])

  // Animação de subida do container principal
  const slideUp = {
    initial: {
      y: 0
    },
    exit: {
      y: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
    }
  }

  // Caminho do SVG: Começa reto e se curva para cima na saída
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  Z`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  Z`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 }
    }
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#141516] text-white"
    >
      {/* Texto central de saudações */}
      <div className="flex items-center text-3xl md:text-5xl font-light z-10">
        <span className="mr-3 block h-3 w-3 rounded-full bg-white"></span>
        <p>{words[index]}</p>
      </div>

      {/* SVG responsável pelo efeito de curva arco na borda inferior */}
      {dimension.height > 0 && (
        <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#141516]">
          <motion.path
            variants={curve}
            initial="initial"
            exit="exit"
          ></motion.path>
        </svg>
      )}
    </motion.div>
  )
}