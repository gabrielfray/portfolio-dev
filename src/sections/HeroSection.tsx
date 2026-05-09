import { portfolioContent } from '@/data/portfolio'

export function HeroSection() {
  return (
    <section className="content-shell pb-16 pt-8 sm:pb-24 sm:pt-12">
      <div className="glass-card relative overflow-hidden px-6 py-12 sm:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 -translate-y-10 translate-x-12 rounded-full bg-brand-200/70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-10 translate-y-10 rounded-full bg-brand-300/40 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              Disponivel para freela
            </span>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl lg:text-6xl">
              Eu desenvolvo experiencias web profissionais para voce fechar mais projetos.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {portfolioContent.shortBio}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contato"
                className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Falar sobre projeto
              </a>
              <a
                href="#projetos"
                className="rounded-xl border border-brand-300 px-5 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
              >
                Ver portfolio
              </a>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-brand-200 bg-white/70 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Base</p>
            <p className="font-display text-2xl font-semibold text-brand-900">{portfolioContent.location}</p>
            <p className="text-sm text-[var(--text-muted)]">Trabalho remoto para clientes no Brasil e exterior.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
