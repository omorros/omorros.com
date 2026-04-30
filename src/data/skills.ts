// Tech-stack marquee data. Top row = languages + essential tools.
// Bottom row = frameworks & libraries. Icon URLs use Iconify's `logos:` namespace
// where available; `simple-icons:` for the few that aren't in `logos:`.

export interface Skill {
  name: string
  iconUrl: string
}

export const techStackTopRow: Skill[] = [
  { name: 'TypeScript', iconUrl: 'https://api.iconify.design/logos:typescript-icon.svg' },
  { name: 'Python', iconUrl: 'https://api.iconify.design/logos:python.svg' },
  { name: 'JavaScript', iconUrl: 'https://api.iconify.design/logos:javascript.svg' },
  { name: 'Java', iconUrl: 'https://api.iconify.design/logos:java.svg' },
  { name: 'C++', iconUrl: 'https://api.iconify.design/logos:c-plusplus.svg' },
  { name: 'PostgreSQL', iconUrl: 'https://api.iconify.design/logos:postgresql.svg' },
  { name: 'Docker', iconUrl: 'https://api.iconify.design/logos:docker-icon.svg' },
  { name: 'Git', iconUrl: 'https://api.iconify.design/logos:git-icon.svg' },
  { name: 'Linux', iconUrl: 'https://api.iconify.design/logos:linux-tux.svg' },
]

export const techStackBottomRow: Skill[] = [
  { name: 'Next.js', iconUrl: 'https://api.iconify.design/logos:nextjs-icon.svg' },
  { name: 'React', iconUrl: 'https://api.iconify.design/logos:react.svg' },
  { name: 'React Native', iconUrl: 'https://api.iconify.design/logos:react.svg' },
  { name: 'Expo', iconUrl: 'https://api.iconify.design/logos:expo-icon.svg' },
  { name: 'Tailwind CSS', iconUrl: 'https://api.iconify.design/logos:tailwindcss-icon.svg' },
  { name: 'Framer Motion', iconUrl: 'https://api.iconify.design/logos:framer.svg' },
  { name: 'Node.js', iconUrl: 'https://api.iconify.design/logos:nodejs-icon.svg' },
  { name: 'FastAPI', iconUrl: 'https://api.iconify.design/logos:fastapi-icon.svg' },
  { name: 'SQLAlchemy', iconUrl: 'https://api.iconify.design/simple-icons:sqlalchemy.svg?color=%23d71f00' },
  { name: 'Playwright', iconUrl: 'https://api.iconify.design/logos:playwright.svg' },
  { name: 'LangGraph', iconUrl: 'https://api.iconify.design/simple-icons:langgraph.svg?color=%23ffffff' },
  { name: 'Claude', iconUrl: 'https://api.iconify.design/simple-icons:anthropic.svg?color=%23d97757' },
  { name: 'OpenAI', iconUrl: 'https://api.iconify.design/logos:openai-icon.svg' },
  { name: 'TensorFlow', iconUrl: 'https://api.iconify.design/logos:tensorflow.svg' },
]
