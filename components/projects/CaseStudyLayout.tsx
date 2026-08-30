import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Code2 } from 'lucide-react'
import type { SystemProject } from '@/lib/projects-data'
import ProjectNav from './ProjectNav'
import ProjectGallery from './ProjectGallery'
import ContactCTA from './ContactCTA'
import { getAdjacentProject } from '@/lib/projects-data'

export default function CaseStudyLayout({ project }: { project: SystemProject }) {
  const next = getAdjacentProject(project.slug)

  return (
    <>
      <div className="relative h-[70vh] w-full">
        <Image src={project.cover} alt={project.title} fill priority className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-8 pb-10 md:px-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.category}
          </span>
          <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-6xl">
            {project.title}
          </h1>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white transition-colors duration-500 ease-out hover:bg-white hover:text-black"
                >
                  Ver projeto no ar
                  <ExternalLink size={14} />
                </Link>
              )}
              {project.repoUrl && (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors duration-500 ease-out hover:border-accent hover:text-accent"
                >
                  Código no GitHub
                  <Code2 size={14} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-8 py-20 md:px-0">
        <section className="mb-14">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">Problema</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{project.problema}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">Solução</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{project.solucao}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">Resultado</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{project.resultado}</p>
        </section>
      </div>

      {project.gallery.length > 0 && (
        <ProjectGallery images={project.gallery} title={project.title} />
      )}

      <ContactCTA />
      <ProjectNav next={next} />
    </>
  )
}