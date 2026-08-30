'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { useTransition } from './TransitionContext'

interface HeroProps {
  isLoaded: boolean
}

export default function Hero({ isLoaded }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { navigateTo } = useTransition()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -400])

  const scrollToSection = (id: string) => {
    navigateTo(id)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const, delay: 0.4 }
    }
  }

  return (
    <motion.header
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      className="relative h-screen w-full overflow-hidden bg-[#999D9E]"
    >
      {/* Imagem de Fundo Centrada */}
      <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
        <div className="relative w-full max-w-[820px] h-[98vh]">
          <Image
            src="/images/projects/sua-imagem.png"
            alt="Kayky Bazzan"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Navbar Superior */}
      <nav className="relative z-30 flex items-center justify-between px-8 py-6 text-white text-sm font-light">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-light text-white backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Disponível para novos projetos
          </span>
        </motion.div>

        <ul className="flex items-center gap-8">
          <li
            onClick={() => scrollToSection('about')}
            className="relative cursor-pointer text-white/60 transition-colors duration-500 ease-out hover:text-white"
          >
            Sobre Mim
          </li>
          <li
            onClick={() => scrollToSection('footer')}
            className="relative cursor-pointer text-white/60 transition-colors duration-500 ease-out hover:text-white"
          >
            Contato
          </li>
          <li>
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-normal text-white transition-colors duration-500 ease-out hover:bg-white hover:text-black cursor-pointer"
            >
              Ver Projetos
              <ArrowUpRight
                size={14}
                className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </li>
        </ul>
      </nav>

      {/* Indicador de scroll */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="absolute right-8 top-24 z-30 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[11px] font-light tracking-wide">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>

      {/* Marquee do Nome */}
      <div className="absolute bottom-12 left-0 w-full z-20 overflow-hidden whitespace-nowrap">
        <motion.div style={{ x }} className="flex whitespace-nowrap">
          <h1 className="text-[14vw] font-medium leading-none tracking-tight text-white pr-12 flex-shrink-0">
            Kayky Bazzan —
          </h1>
          <h1 className="text-[14vw] font-medium leading-none tracking-tight text-white pr-12 flex-shrink-0">
            Kayky Bazzan —
          </h1>
          <h1 className="text-[14vw] font-medium leading-none tracking-tight text-white pr-12 flex-shrink-0">
            Kayky Bazzan —
          </h1>
        </motion.div>
      </div>
    </motion.header>
  )
}