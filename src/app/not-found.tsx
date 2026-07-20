import Link from 'next/link'
import { Container, Lead, Spacer, Title } from '@/components/site/ui'

export default function NotFound() {
  return (
    <main className="pb-32">
      <Container>
        <Spacer size="xl" />

        <Title>404</Title>

        <Spacer size="lg" />

        <Lead>This page does not exist. These do:</Lead>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-lg">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link href="/projects" className="text-blue-500 hover:underline">
            Projects
          </Link>
          <Link href="/journal" className="text-blue-500 hover:underline">
            Journal
          </Link>
          <Link href="/work" className="text-blue-500 hover:underline">
            Work
          </Link>
        </div>
      </Container>
    </main>
  )
}
