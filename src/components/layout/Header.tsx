import { portfolioContent } from '@/data/portfolio'

export function Header() {
  return (
    <header className="content-shell py-8">
      <div className="glass-card flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="font-display text-xl font-semibold text-brand-800">{portfolioContent.name}</p>
          <p className="text-sm text-[var(--text-muted)]">{portfolioContent.role}</p>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-brand-700">
          <a href="#projetos" className="transition hover:text-brand-900">
            Projetos
          </a>
          <a href="#experiencia" className="transition hover:text-brand-900">
            Experiencia
          </a>
          <a href="#contato" className="transition hover:text-brand-900">
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}
