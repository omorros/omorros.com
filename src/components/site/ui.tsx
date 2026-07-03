import Link from 'next/link'

// Shared page primitives. Classes follow components/ui.js on samselikoff.com.

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl px-6 mx-auto lg:max-w-3xl lg:px-0">{children}</div>
  )
}

export function Spacer({ size = 'md' }: { size?: 'md' | 'lg' | 'xl' }) {
  const styles = {
    md: 'mt-8',
    lg: 'mt-8 md:mt-10 xl:mt-16',
    xl: 'mt-8 md:mt-16 xl:mt-24',
  }
  return <div className={styles[size]} />
}

export function Title({
  size = 'md',
  children,
}: {
  size?: 'sm' | 'md'
  children: React.ReactNode
}) {
  const styles = {
    sm: 'text-4xl font-semibold leading-tight text-gray-800 md:text-5xl lg:text-6xl lg:leading-none lg:font-medium xl:text-7xl',
    md: 'text-5xl font-semibold leading-tight text-gray-800 md:text-6xl md:leading-none lg:text-7xl lg:font-medium xl:text-8xl',
  }
  return <h1 className={styles[size]}>{children}</h1>
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-2xl">
      {children}
    </p>
  )
}

export function A({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const className =
    'font-medium text-blue-500 border-b border-blue-300 hover:border-blue-400'
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
