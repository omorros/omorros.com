// Section header - h2 with inline horizontal rule (Subhan pattern), optional mono caption below.

interface SectionHeaderProps {
  title: string
  caption?: string
}

export function SectionHeader({ title, caption }: SectionHeaderProps) {
  return (
    <div className="mb-7">
      <h2 className="text-2xl font-display tracking-tight text-foreground flex items-center gap-3">
        <span className="shrink-0">{title}</span>
        <div className="h-px flex-1 bg-border-soft" />
      </h2>
      {caption && (
        <p className="mt-1.5 font-mono text-[11px] tracking-wide text-foreground-faint">
          {caption}
        </p>
      )}
    </div>
  )
}
