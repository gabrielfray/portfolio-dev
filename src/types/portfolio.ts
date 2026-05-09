export type SocialLink = {
  label: string
  href: string
}

export type Highlight = {
  title: string
  description: string
}

export type Project = {
  name: string
  summary: string
  stack: string[]
  repoUrl: string
  liveUrl?: string
}

export type Experience = {
  role: string
  company: string
  period: string
  description: string
}

export type PortfolioContent = {
  name: string
  role: string
  location: string
  shortBio: string
  socialLinks: SocialLink[]
  highlights: Highlight[]
  projects: Project[]
  experiences: Experience[]
  email: string
}
