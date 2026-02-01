'use client'

import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/PageWrapper'
import { HomePage } from '@/components/pages/HomePage'

const AboutPage = dynamic(() => import('@/components/pages/AboutPage').then(mod => mod.AboutPage))
const EducationPage = dynamic(() => import('@/components/pages/EducationPage').then(mod => mod.EducationPage))
const SkillsPage = dynamic(() => import('@/components/pages/SkillsPage').then(mod => mod.SkillsPage))
const ProjectsPage = dynamic(() => import('@/components/pages/ProjectsPage').then(mod => mod.ProjectsPage))
const ContactPage = dynamic(() => import('@/components/pages/ContactPage').then(mod => mod.ContactPage))

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
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
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
      content: <AboutPage />,
    },
    {
      id: 'experience',
      title: 'Education',
      description: 'My academic journey',
      gradient: '/gradients/experience.svg',
      glowColor: '#ff6b35',
      content: <EducationPage />,
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
      content: <ContactPage />,
    },
  ]

  return <PageWrapper pages={pages} />
}
