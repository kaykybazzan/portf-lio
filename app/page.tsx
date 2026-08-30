'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import { getHasShownPreloader, setHasShownPreloader } from '@/lib/preloader-state'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(() => getHasShownPreloader())

  useEffect(() => {
    // Inicialização do Smooth Scroll
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      new LocomotiveScroll()
    })()
  }, [])

  const handlePreloaderComplete = () => {
    setHasShownPreloader()
    setIsLoaded(true)
  }

  return (
    <main className="bg-surface text-white min-h-screen">
      <AnimatePresence mode='wait'>
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      <Hero isLoaded={isLoaded} />
      <About />
      <Projects />
      <Footer />
    </main>
  )
}