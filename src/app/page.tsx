import { Hero } from '@/components/Hero'
import { SocialLinks } from '@/components/SocialLinks'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SkillsSection } from '@/components/SkillsSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SocialLinks />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <Footer />
    </main>
  )
}
