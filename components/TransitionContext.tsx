'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import Curtain from '@/components/Curtain'

type Phase = 'idle' | 'covering' | 'revealing'

interface TransitionContextValue {
  navigateTo: (id: string) => void
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [targetId, setTargetId] = useState<string | null>(null)

  const navigateTo = useCallback((id: string) => {
    setTargetId(id)
    setPhase('covering')
  }, [])

  const handleCoverComplete = useCallback(() => {
    if (targetId) {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'auto' })
      }
    }
    setPhase('revealing')
  }, [targetId])

  const handleRevealComplete = useCallback(() => {
    setPhase('idle')
  }, [])

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <Curtain
        phase={phase}
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error('useTransition precisa ser usado dentro de um TransitionProvider')
  }
  return ctx
}