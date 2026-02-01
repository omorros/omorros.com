export interface SkillCategory {
  title: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'Python', 'Java', 'C++', 'JavaScript'],
  },
  {
    title: 'Frontend & Mobile',
    items: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaFX'],
  },
  {
    title: 'Backend & Database',
    items: ['FastAPI', 'PostgreSQL', 'MySQL', 'Node.js'],
  },
  {
    title: 'AI & Data Science',
    items: ['TensorFlow', 'Keras', 'Computer Vision', 'Deep Learning', 'NLP'],
  },
  {
    title: 'DevOps & Tools',
    items: ['Git', 'Docker', 'AWS', 'Linux', 'Arduino', 'IoT'],
  },
]
