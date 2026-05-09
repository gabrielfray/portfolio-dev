import { portfolioContent } from '@/data/portfolio'

export function Footer() {
  return (
    <footer className="content-shell py-10">
      <div className="flex flex-col gap-2 border-t border-[var(--border-soft)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>{portfolioContent.name} - Portfolio</p>
        <p>Feito com React + Tailwind CSS</p>
      </div>
    </footer>
  )
}
