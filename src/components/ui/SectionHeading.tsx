type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle: string
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <header className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">{subtitle}</p>
    </header>
  )
}
