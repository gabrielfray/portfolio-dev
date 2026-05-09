import type { PortfolioContent } from '@/types/portfolio'

export const portfolioContent: PortfolioContent = {
  name: 'Gabriel Fray',
  role: 'Frontend Engineer',
  location: 'Brasil (remoto)',
  shortBio:
    'Eu projeto e construo interfaces performaticas com foco em conversao, UX real e entregas rapidas para produtos digitais.',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Email', href: 'mailto:seuemail@exemplo.com' },
  ],
  highlights: [
    {
      title: 'Entrega orientada a negocio',
      description: 'Roadmaps quebrados em entregas curtas para gerar valor real para o cliente.',
    },
    {
      title: 'Codigo limpo e escalavel',
      description: 'Arquitetura componentizada com padrao consistente para evoluir o produto sem caos.',
    },
    {
      title: 'Foco em experiencia',
      description: 'Interfaces leves, responsivas e com detalhes visuais que aumentam credibilidade.',
    },
  ],
  projects: [
    {
      name: 'Dashboard de Performance',
      summary:
        'Painel para acompanhar funis, metas e resultados de campanhas em tempo real com visual limpo.',
      stack: ['React', 'TypeScript', 'Tailwind CSS'],
      repoUrl: 'https://github.com/',
      liveUrl: 'https://example.com',
    },
    {
      name: 'Landing Page para SaaS',
      summary:
        'Landing page com storytelling de produto, secoes modulares e CTA estrategico para freela.',
      stack: ['React', 'Vite', 'Tailwind CSS'],
      repoUrl: 'https://github.com/',
    },
    {
      name: 'Sistema de Reservas',
      summary: 'Fluxo completo de reserva com formularios guiados, validacao e feedback instantaneo.',
      stack: ['React', 'TypeScript', 'Zod'],
      repoUrl: 'https://github.com/',
      liveUrl: 'https://example.com',
    },
  ],
  experiences: [
    {
      role: 'Freelancer Full Stack',
      company: 'Projetos sob demanda',
      period: '2023 - atual',
      description: 'Desenvolvimento de websites e paineis internos com foco em performance e entregas curtas.',
    },
    {
      role: 'Desenvolvedor Frontend',
      company: 'Studio Digital',
      period: '2021 - 2023',
      description: 'Construcao de interfaces para e-commerce e produtos B2B com design system proprio.',
    },
  ],
  email: 'seuemail@exemplo.com',
}
