'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = [
  'E se',
  'a peça',
  'que falta',
  'no seu negócio',
  'estivesse',
  'bem na sua frente?',
]

// Variantes do contêiner da palavra (gerencia o ritmo da onda)
const wordVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04, // Ritmo ligeiramente mais espaçado entre as letras
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: 1,
    },
  },
}

// Variantes de cada letra individual
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -45,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6, // Entrada um pouco mais cadenciada
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(6px)',
    transition: {
      duration: 0.4,
      ease: [0.55, 0.055, 0.675, 0.19] as const,
    },
  },
}

export default function Preloader({
  onComplete,
}: {
  onComplete?: () => void
}) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimension()
    window.addEventListener('resize', updateDimension)

    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [])

  useEffect(() => {
    const isLastWord = index === words.length - 1

    const timer = setTimeout(
      () => {
        if (isLastWord) {
          onComplete?.()
        } else {
          setIndex((prev) => prev + 1)
        }
      },
      // Tempos aumentados para leitura mais confortável
      isLastWord ? 3200 : 2200
    )

    return () => clearTimeout(timer)
  }, [index, onComplete])

  const slideUp = {
    initial: {
      y: 0,
    },
    exit: {
      y: '-100vh',
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.1,
      },
    },
  }

  const initialPath = `
    M0 0
    L${dimension.width} 0
    L${dimension.width} ${dimension.height}
    Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}
    Z
  `

  const targetPath = `
    M0 0
    L${dimension.width} 0
    L${dimension.width} ${dimension.height}
    Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}
    Z
  `

  const curve = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.3,
      },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#141516] text-white"
    >
      <div className="relative z-10 flex h-[180px] w-full items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-wrap justify-center origin-center text-3xl font-light md:text-5xl"
            style={{ perspective: 1000 }}
          >
            {words[index].split('').map((char, charIdx) => (
              <motion.span
                key={`${char}-${charIdx}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {dimension.height > 0 && (
        <svg
          className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#141516]"
          viewBox={`0 0 ${dimension.width} ${dimension.height + 300}`}
          preserveAspectRatio="none"
        >
          <motion.path
            variants={curve}
            initial="initial"
            exit="exit"
          />
        </svg>
      )}
    </motion.div>
  )
}