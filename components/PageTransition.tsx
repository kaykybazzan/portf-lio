'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Tipagem explícita 'Variants' resolve os erros de tipo de ease e transition
const slideUp: Variants = {
  initial: {
    y: '0%',
  },
  exit: {
    y: '-100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={slideUp}
          initial="initial"
          animate="exit"
          className="fixed top-0 left-0 z-[9999] w-screen h-screen bg-[#1C1D20] pointer-events-none"
        />
      </AnimatePresence>

      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
}