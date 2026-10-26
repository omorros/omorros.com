// Types for a flow diagram. Each project's diagram declares its own tones
// (what travels along the lines and the colour it takes), boxes and lines,
// and optionally the modes a visitor can switch between and shaded zones.

export type Swatch = 'grey' | 'blue' | 'violet' | 'amber' | 'green' | 'rose'

export interface FlowNode<N extends string = string, T extends string = string, M extends string = string> {
  id: N
  label: string
  note: string
  // Small technical detail: formats, models, limits.
  detail?: string
  // Steps inside the box that light up in turn.
  steps?: string[]
  // What the box shows when the scene reaches it. A box shared by several
  // modes can show something different in each, and nothing in a mode it
  // leaves out.
  live?: string | Partial<Record<NoInfer<M>, string>>
  // Colour the box lights up in. Without one it lights up grey.
  tone?: NoInfer<T>
  // Position on a left to right grid (up to 5 columns and 3 rows); phones
  // read it top to bottom.
  col: number
  row: number
  // A third-party service rather than something the project built.
  service?: boolean
  // The modes this box belongs to. A box that lists none is in all of them.
  modes?: readonly NoInfer<M>[]
}

// A tab above the diagram. Picking it fades the boxes the mode does not use
// and replays the scene along its path.
export interface FlowMode {
  label: string
  // One line under the tabs about what this mode is for.
  note?: string
}

// A shaded, labelled area behind some boxes, such as what runs on one machine.
export interface FlowZone<N extends string = string> {
  label: string
  nodes: readonly NoInfer<N>[]
}

// From, to, and optionally what travels along it (defaults to the source
// box's tone).
export type FlowEdge<N extends string = string, T extends string = string> =
  | readonly [NoInfer<N>, NoInfer<N>]
  | readonly [NoInfer<N>, NoInfer<N>, NoInfer<T>]

export interface Flow<N extends string = string, T extends string = string, M extends string = string> {
  // Each tone's colour, and its legend label. Tones without a label stay out
  // of the legend.
  tones: Record<T, { swatch: Swatch; label?: string }>
  // The modes, in tab order. Without them the diagram has no tabs.
  modes?: Record<M, FlowMode>
  nodes: readonly FlowNode<N, T, M>[]
  edges: readonly FlowEdge<N, T>[]
  zones?: readonly FlowZone<N>[]
  caption: string
}

// Checks a diagram where it is written: a line or tone pointing at a box or
// tone that does not exist is a type error on that line.
export function defineFlow<const N extends string, const T extends string, const M extends string = never>(
  flow: Flow<N, T, M>,
): Flow {
  return flow as unknown as Flow
}
