// Types for a flow diagram. Each project's diagram declares its own tones
// (what travels along the lines and the colour it takes), boxes and lines.

export type Swatch = 'grey' | 'blue' | 'violet' | 'amber' | 'green' | 'rose'

export interface FlowNode<N extends string = string, T extends string = string> {
  id: N
  label: string
  note: string
  // Small technical detail: formats, models, limits.
  detail?: string
  // Steps inside the box that light up in turn.
  steps?: string[]
  // What the box shows when the scene reaches it.
  live?: string
  // Colour the box lights up in. Without one it lights up grey.
  tone?: NoInfer<T>
  // Position on a left to right grid (up to 5 columns and 3 rows); phones
  // read it top to bottom.
  col: number
  row: number
  // A third-party service rather than something the project built.
  service?: boolean
}

// From, to, and optionally what travels along it (defaults to the source
// box's tone).
export type FlowEdge<N extends string = string, T extends string = string> =
  | readonly [NoInfer<N>, NoInfer<N>]
  | readonly [NoInfer<N>, NoInfer<N>, NoInfer<T>]

export interface Flow<N extends string = string, T extends string = string> {
  // Each tone's colour, and its legend label. Tones without a label stay out
  // of the legend.
  tones: Record<T, { swatch: Swatch; label?: string }>
  nodes: readonly FlowNode<N, T>[]
  edges: readonly FlowEdge<N, T>[]
  caption: string
}

// Checks a diagram where it is written: a line or tone pointing at a box or
// tone that does not exist is a type error on that line.
export function defineFlow<const N extends string, const T extends string>(flow: Flow<N, T>): Flow {
  return flow as unknown as Flow
}
