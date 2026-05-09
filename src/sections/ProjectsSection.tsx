import { SectionHeading } from '@/components/ui/SectionHeading'
import { portfolioContent } from '@/data/portfolio'

export function ProjectsSection() {
  return (
    <section id="projetos" className="content-shell space-y-10 pb-16 sm:pb-20">
      <SectionHeading
        eyebrow="Portfolio"
        title="Projetos que mostram meu nivel tecnico"
        subtitle="Estrutura pensada para apresentar cases de forma clara em propostas comerciais e plataformas de freela."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portfolioContent.projects.map((project) => (
          <article key={project.name} className="glass-card flex flex-col p-6">
            <h3 className="font-display text-xl font-semibold text-brand-900">{project.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.summary}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={`${project.name}-${item}`}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-4 text-sm font-semibold text-brand-700">
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-brand-900">
                Codigo
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-brand-900">
                  Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
