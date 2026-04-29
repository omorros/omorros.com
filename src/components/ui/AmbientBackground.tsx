// Hero ambient - three stacked god-ray glows. Soft, mostly neutral.
// Toned down from blue-heavy → near-white in light mode, faint white in dark.

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 overflow-hidden h-[800px]"
    >
      {/* Soft round bloom centred above the hero */}
      <div className="absolute -top-[350px] left-1/2 -translate-x-1/2 w-[80vw] md:w-[600px] h-[400px] bg-foreground/[0.03] blur-[60px] rounded-[100%] mix-blend-screen opacity-30" />

      {/* Top beam - soft gradient downward, neutral */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-gradient-to-b from-foreground/[0.04] to-transparent blur-[40px] opacity-25" />
    </div>
  )
}
