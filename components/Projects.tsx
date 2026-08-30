'use client'

import Image from 'next/image'
import Link from 'next/link'

// Fileira de cima — sistemas e aplicações full-stack (3 itens)
const projectsRow1 = [
  { id: 1, title: 'Nordil ERP', category: 'Sistema ERP · Full Stack', image: '/images/projects/nordil-capa.png', link: '/projects/nordil-erp' },
  { id: 2, title: 'DentalReativa', category: 'SaaS · Full Stack', image: '/images/projects/dentalreative-capa.png', link: '/projects/dentalreativa' },
  { id: 3, title: 'Dashboard Logística', category: 'Dashboard Web', image: '/images/projects/dashboard-logistica.png', link: '/projects/dashboard-logistica' },
]

// Fileira de baixo — os 5 dashboards de Power BI (5 itens)
const projectsRow2 = [
  { id: 4, title: 'Dashboard Comercial', category: 'Power BI', image: '/images/projects/dashboard-comercial.jpg', link: '/projects/dashboard-comercial' },
  { id: 5, title: 'Dashboard E-commerce', category: 'Power BI', image: '/images/projects/dashboard-ecommerce.jpg', link: '/projects/dashboard-ecommerce' },
  { id: 6, title: 'Dashboard Operação', category: 'Power BI', image: '/images/projects/dashboard-operacao.jpg', link: '/projects/dashboard-operacao' },
  { id: 7, title: 'Dashboard RH', category: 'Power BI', image: '/images/projects/dashboard-rh.jpg', link: '/projects/dashboard-rh' },
  { id: 8, title: 'Dashboard Financeiro', category: 'Power BI', image: '/images/projects/dashoard-financeiro.jpg', link: '/projects/dashboard-financeiro' },
]

export default function Projects() {
  // Ajustamos a quantidade para que ambas as listas tenham 15 itens no total.
  // Dessa forma, ambas terão exatamente a mesma largura em pixels e a mesma velocidade visual.
  const doubleRow1 = [...projectsRow1, ...projectsRow1, ...projectsRow1, ...projectsRow1, ...projectsRow1] // 3 x 5 = 15 itens
  const doubleRow2 = [...projectsRow2, ...projectsRow2, ...projectsRow2] // 5 x 3 = 15 itens

  return (
    <section id="projects" className="w-full py-24 bg-surface text-white overflow-hidden flex flex-col gap-12">

      {/* Cabeçalho */}
      <div className="max-w-[1200px] mx-auto px-6 w-full flex flex-col gap-2">
        <span className="text-xs text-accent uppercase tracking-widest font-medium">
          Portfólio
        </span>
        <h2 className="text-4xl lg:text-6xl font-light tracking-tight">
          Projetos em Destaque
        </h2>
      </div>

      {/* Container de Filas Deslizantes */}
      <div className="flex flex-col gap-8 w-full">

        {/* Linha 1 - Sistemas full-stack - Indo para a Esquerda */}
        <div className="flex w-full overflow-x-hidden group">
          <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
            {doubleRow1.map((project, idx) => (
              <ProjectCard key={`row1-${project.id}-${idx}`} project={project} />
            ))}
          </div>
        </div>

        {/* Linha 2 - Power BI - Indo para a Direita (Sentido Inverso) */}
        <div className="flex w-full overflow-x-hidden group">
          <div className="flex gap-6 animate-marquee-reverse group-hover:[animation-play-state:paused] will-change-transform">
            {doubleRow2.map((project, idx) => (
              <ProjectCard key={`row2-${project.id}-${idx}`} project={project} />
            ))}
          </div>
        </div>

      </div>

    </section>
  )
}

function ProjectCard({ project }: { project: { title: string; category: string; image: string; link: string } }) {
  return (
    <Link
      href={project.link}
      className="relative shrink-0 w-[320px] sm:w-[420px] h-[240px] sm:h-[280px] rounded-2xl overflow-hidden bg-surface-2 border border-white/10 group/card transition-colors duration-300 ease-out hover:border-accent"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-110"
      />

      {/* Overlay com Gradiente e Informações */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
        <span className="text-xs text-accent font-medium">{project.category}</span>
        <h3 className="text-lg font-medium text-white">{project.title}</h3>
      </div>
    </Link>
  )
}