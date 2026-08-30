import { notFound } from 'next/navigation'
import { projectsData, getAllProjectSlugs } from '@/lib/projects-data'
import CaseStudyLayout from '@/components/projects/CaseStudyLayout'
import DashboardLayout from '@/components/projects/DashboardLayout'

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-bg text-white">
      {project.type === 'system' ? (
        <CaseStudyLayout project={project} />
      ) : (
        <DashboardLayout project={project} />
      )}
    </main>
  )
}