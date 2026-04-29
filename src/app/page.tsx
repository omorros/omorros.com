// Page composition — Subhan-style flow, full section list:
//   hero → ask-block → experience (work) → tech-stack (skills) → articles →
//   selected-projects → philosophy quote (scroll-fill) → build-log →
//   hackathons → education → now → page-visits → contact

import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import DynamicNavigation from '@/components/nav/DynamicNavigation'
import { Timeline } from '@/components/nav/Timeline'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { ScrollFillText } from '@/components/ui/ScrollFillText'
import { Hero } from '@/components/page/Hero'
import { Experience } from '@/components/page/Experience'
import { TechStack } from '@/components/page/TechStack'
import { SelectedWork } from '@/components/page/SelectedWork'
import { Education } from '@/components/page/Education'
import { ContactNow } from '@/components/page/ContactNow'
import { Preloader } from '@/components/page/Preloader'

export default function Page() {
  return (
    <>
      <Preloader />
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

        {/* Scroll-fill philosophy quote */}
        <ScrollFillText text="Build with rigor. Ship with soul. Care about the gap between demo and product." />

        {/* Education */}
        <Education />

        {/* Contact (id="contact") */}
        <ContactNow />
      </main>
    </>
  )
}
