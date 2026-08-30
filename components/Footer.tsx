'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDownLeft } from 'lucide-react'
import Image from 'next/image'

// Curva de transição entre a seção de Projetos e o Footer.
// Fica só aqui dentro agora — não existe mais um arquivo separado
// FooterCurve.tsx, então não tem risco de renderizar duas vezes.
function FooterCurve() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 35%'],
  })

  const rawHeight = useTransform(scrollYProgress, [0, 1], [100, 0])
  const height = useSpring(rawHeight, { stiffness: 120, damping: 20 })

  return (
    <div ref={containerRef} className="relative w-full pointer-events-none -mb-1 z-10 bg-surface">
      <motion.div style={{ height }} className="w-full relative overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block w-full h-full"
          aria-hidden="true"
        >
          {/* Curva fluida vinda dos lados e subindo no centro,
              preenchida com o token de cor do sistema (--surface) */}
          <path
            d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
            fill="var(--surface)"
          />
        </svg>
      </motion.div>
    </div>
  )
}

// Componente do Botão com transição transparente na diagonal
function FooterButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.96 }}
      className="relative overflow-hidden rounded-full border border-zinc-700 px-8 py-4 text-sm md:text-base text-white font-light cursor-pointer inline-block"
    >
      <motion.div
        initial={{ y: '100%', x: '-100%' }}
        animate={{
          y: isHovered ? '0%' : '100%',
          x: isHovered ? '0%' : '-100%',
        }}
        transition={{
          duration: 0.75,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm pointer-events-none"
      />

      <span className="relative z-10 transition-colors duration-500">
        {children}
      </span>
    </motion.a>
  )
}

// Componente Principal do Footer
export default function Footer() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0])

  return (
    <>
      <FooterCurve />

      <footer
        id="footer"
        ref={containerRef}
        className="relative bg-surface-2 text-white min-h-[50vh] flex flex-col justify-between overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="flex flex-col justify-between h-full max-w-7xl mx-auto w-full p-8 md:p-16 pt-16"
        >
          {/* Cabeçalho do Footer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-zinc-800 pb-12">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/projects/foto-perfil.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-5xl md:text-8xl font-light tracking-tight">
                Vamos Trabalhar<br />Juntos
              </h2>
            </div>
            <ArrowDownLeft className="w-10 h-10 stroke-1 text-zinc-400 self-end md:self-center" />
          </div>

          {/* Rodapé com Botões Animados */}
          <div className="flex flex-col md:flex-row justify-between items-end mt-20 gap-8 pb-8">
            <div className="flex flex-wrap gap-4">
              <FooterButton href="mailto:kaykybazzan@gmail.com">
                kaykybazzan@gmail.com
              </FooterButton>

              <FooterButton href="tel:+554788231164">
                +55 47 8823-1164
              </FooterButton>
            </div>

            <div className="flex gap-6 text-xs text-zinc-400">
              <span>© 2026 Kayky</span>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  )
}