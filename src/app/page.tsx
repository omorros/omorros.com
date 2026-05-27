// Page composition: hero -> experience -> tech-stack -> projects -> education -> contact

import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import DynamicNavigation from '@/components/nav/DynamicNavigation'
import { Timeline } from '@/components/nav/Timeline'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Hero } from '@/components/page/Hero'
import { Experience } from '@/components/page/Experience'
import { TechStack } from '@/components/page/TechStack'
import { SelectedWork } from '@/components/page/SelectedWork'
import { Education } from '@/components/page/Education'
import { ContactNow } from '@/components/page/ContactNow'

export default function Page() {
  return (
    <>
      <AmbientBackground />
      <DynamicNavigation />
      <Timeline />
      <ThemeToggle />
      <CommandPalette />

      <main
        id="top"
        className="relative max-w-4xl mx-auto px-6 pt-24 md:pt-40 pb-6 z-10"
      >
        {/* Hero is the About section (id="about") */}
        <Hero />

        {/* Experience renders id="work" */}
        <div id="work" className="scroll-mt-32">
          <Experience />
        </div>

        {/* TechStack renders id="skills" */}
        <div id="skills" className="scroll-mt-32">
          <TechStack />
        </div>

        {/* Selected Projects (id="projects") */}
        <div id="projects" className="scroll-mt-32">
          <SelectedWork />
        </div>

        {/* Education */}
        <div id="education" className="scroll-mt-32">
          <Education />
        </div>

        {/* Contact (id="contact") */}
        <ContactNow />
      </main>
    </>
  )
}
