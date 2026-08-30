import Image from 'next/image'
import type { DashboardProject } from '@/lib/projects-data'
import ProjectNav from './ProjectNav'
import ContactCTA from './ContactCTA'
import { getAdjacentProject } from '@/lib/projects-data'

export default function DashboardLayout({ project }: { project: DashboardProject }) {
  const next = getAdjacentProject(project.slug)

  return (
    <>
      <div className="mx-auto max-w-5xl px-8 pt-16 md:px-16">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {project.category}
        </span>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">{project.title}</h1>

        {/* A imagem GRANDE é a prova — dashboard fica destacado, sem seções longas */}
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-2">
          <Image src={project.cover} alt={project.title} fill className="object-contain" />
        </div>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70">
          {project.descricao}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.medidas.map((m: string) => (
            <span
              key={m}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <ContactCTA />
        <ProjectNav next={next} />
      </div>
    </>
  )
}