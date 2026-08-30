'use client'

import { motion, Variants } from 'framer-motion'

type Phase = 'idle' | 'covering' | 'revealing'

const curtainVariants: Variants = {
  idle: { y: '-100%' },
  covering: {
    y: '0%',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  revealing: {
    y: '-100%',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
  },
}

interface CurtainProps {
  phase: Phase
  onCoverComplete: () => void
  onRevealComplete: () => void
}

export default function Curtain({ phase, onCoverComplete, onRevealComplete }: CurtainProps) {
  return (
    <motion.div
      variants={curtainVariants}
      initial="idle"
      animate={phase}
      onAnimationComplete={(definition) => {
        if (definition === 'covering') onCoverComplete()
        if (definition === 'revealing') onRevealComplete()
      }}
      className="fixed top-0 left-0 z-[9999] h-screen w-screen bg-[#1C1D20] pointer-events-none"
    />
  )
}