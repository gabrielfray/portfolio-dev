import { portfolioContent } from '@/data/portfolio'

export function HighlightsSection() {
  return (
    <section className="content-shell pb-16 sm:pb-20">
      <div className="grid gap-4 md:grid-cols-3">
        {portfolioContent.highlights.map((highlight) => (
          <article key={highlight.title} className="glass-card p-6">
            <h3 className="font-display text-xl font-semibold text-brand-800">{highlight.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{highlight.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
