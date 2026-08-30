import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projects-data'

export default function ProjectNav({ next }: { next: Project }) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 px-8 py-8 md:px-16">
      <Link
        href="/#projetos"
        className="flex items-center gap-2 text-sm text-white/60 transition-colors duration-500 ease-out hover:text-white"
      >
        <ArrowLeft size={14} />
        Todos os projetos
      </Link>

      <Link
        href={`/projects/${next.slug}`}
        className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-500 ease-out hover:text-accent"
      >
        Próximo: {next.title}
        <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
      </Link>
    </div>
  )
}