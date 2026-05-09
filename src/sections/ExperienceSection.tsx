import { SectionHeading } from '@/components/ui/SectionHeading'
import { portfolioContent } from '@/data/portfolio'

export function ExperienceSection() {
  return (
    <section id="experiencia" className="content-shell space-y-10 pb-16 sm:pb-20">
      <SectionHeading
        eyebrow="Experiencia"
        title="Historico profissional"
        subtitle="Timeline pronta para voce personalizar com contratos, empresas e resultados relevantes."
      />

      <div className="space-y-4">
        {portfolioContent.experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="glass-card grid gap-4 p-6 md:grid-cols-[1fr_auto]"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-900">{experience.role}</h3>
              <p className="mt-1 text-sm font-medium text-brand-700">{experience.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{experience.description}</p>
            </div>
            <span className="self-start rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {experience.period}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
