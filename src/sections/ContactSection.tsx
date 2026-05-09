import { SectionHeading } from '@/components/ui/SectionHeading'
import { portfolioContent } from '@/data/portfolio'

export function ContactSection() {
  return (
    <section id="contato" className="content-shell space-y-10 pb-16 sm:pb-20">
      <SectionHeading
        eyebrow="Contato"
        title="Vamos construir seu proximo projeto"
        subtitle="Bloco final para direcionar leads para WhatsApp, e-mail ou plataformas de freela."
      />

      <div className="glass-card flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="space-y-2">
          <p className="font-display text-2xl font-semibold text-brand-900">Aberto para novos contratos</p>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            Me chama em {portfolioContent.email} e eu te retorno com escopo e prazo inicial.
          </p>
        </div>
        <a
          href={`mailto:${portfolioContent.email}`}
          className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Enviar e-mail
        </a>
      </div>
    </section>
  )
}
