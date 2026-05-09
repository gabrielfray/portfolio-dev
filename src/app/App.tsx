import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ContactSection } from '@/sections/ContactSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { HeroSection } from '@/sections/HeroSection'
import { HighlightsSection } from '@/sections/HighlightsSection'
import { ProjectsSection } from '@/sections/ProjectsSection'

function App() {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <HighlightsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
