'use client'

import { PageWrapper } from '@/components/PageWrapper'
import { HomePage } from '@/components/pages/HomePage'
import { AboutPage } from '@/components/pages/AboutPage'
import { ExperiencePage } from '@/components/pages/ExperiencePage'
import { SkillsPage } from '@/components/pages/SkillsPage'
import { ProjectsPage } from '@/components/pages/ProjectsPage'
import { ContactPage } from '@/components/pages/ContactPage'

export default function Home() {
  const pages = [
    {
      id: 'home',
      gradient: '/gradients/index.svg',
      glowColor: '#8f46db',
      isHome: true,
      content: (
        <HomePage
          onExplore={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      ),
    },
    {
      id: 'about',
      title: 'About Me',
      description: "Hey, I'm Oriol!",
      gradient: '/gradients/about.svg',
      glowColor: '#9e005d',
      compact: true,
      content: <AboutPage />,
    },
    {
      id: 'experience',
      title: 'Education',
      description: 'My academic journey',
      gradient: '/gradients/experience.svg',
      glowColor: '#ff6b35',
      compact: true,
      content: <ExperiencePage />,
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Technologies I work with',
      gradient: '/gradients/skills.svg',
      glowColor: '#83394c',
      content: <SkillsPage />,
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Some of my notable projects',
      gradient: '/gradients/projects.svg',
      glowColor: '#1a4fff',
      content: <ProjectsPage />,
    },
    {
      id: 'contact',
      title: 'Contact',
      description: "Let's get in touch",
      gradient: '/gradients/contact.svg',
      glowColor: '#9e005d',
      compact: true,
      content: <ContactPage />,
    },
  ]

  return <PageWrapper pages={pages} />
}
