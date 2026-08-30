'use client'

import Image from "next/image"
import TextReveal from "./TextReveal"
import MagneticButton from "./MagneticButton"
import { useTransition } from "./TransitionContext"

const stack = ["React", "Next.js", "TypeScript", "PostgreSQL", "Prisma"]

export default function About() {
  const { navigateTo } = useTransition()

  return (
    <section id="about" className="grid min-h-screen w-full grid-cols-1 bg-bg md:grid-cols-2">
      {/* Coluna esquerda — conteúdo */}
      <div className="flex flex-col justify-between px-8 py-10 md:px-16 md:py-14 md:pt-32">
        <div className="max-w-xl my-12 md:my-0">
          <h1 className="text-4xl font-medium leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            <TextReveal text="Sobre Mim" />
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
            <TextReveal text="Sou Kayky Bazzan, estudante de desenvolvimento de software. Meu foco é transformar problemas reais em soluções que funcionam de verdade, entendendo antes onde o sistema trava, seja inconsistência de dados, regra de negócio mal pensada ou processo que não acompanha a operação real." />
          </p>

          <p className="mt-4 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
            <TextReveal text="Utilizo React, Next.js, TypeScript, PostgreSQL e Prisma para construir aplicações que resolvem esse tipo de problema, não só telas bonitas. Prefiro estruturar soluções que aguentam uso real do que entregar protótipos que quebram na primeira exceção." />
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => navigateTo('footer')}
            >
              Contato
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => navigateTo('projects')}
            >
              Ver projetos
            </MagneticButton>
          </div>
        </div>

        <div className="space-y-1 text-sm text-white/40">
          <p>
            Encontre-me no{" "}
            <a
              href="https://github.com/kaykybazzan"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              GitHub
            </a>{" "}
            e{" "}
            <a
              href="https://www.linkedin.com/in/kaykybazzan"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              no LinkedIn
            </a>
            .
          </p>
        </div>
      </div>

      {/* Coluna direita — foto */}
      <div className="relative min-h-[50vh] w-full md:min-h-screen">
        <Image
          src="/images/projects/foto.png"
          alt="Foto de perfil"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}