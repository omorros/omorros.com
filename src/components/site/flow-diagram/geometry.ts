import type { FlowEdge, FlowNode } from './types'

export type Box = { left: number; top: number; width: number; height: number }

// Lines follow the reading direction: left to right on wide screens, top to
// bottom on phones. Boxes side by side in that direction connect across.
export function connect(a: Box, b: Box, vertical: boolean): string {
  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  const across = vertical ? Math.abs(dy) < 8 : Math.abs(dx) >= 8
  if (across) {
    const sx = a.left + a.width
    const sy = a.top + a.height / 2
    const ex = b.left - 6
    const ey = b.top + b.height / 2
    const k = (ex - sx) / 2
    return `M${sx} ${sy} C${sx + k} ${sy} ${ex - k} ${ey} ${ex} ${ey}`
  }
  const sx = a.left + a.width / 2
  const sy = a.top + a.height
  const ex = b.left + b.width / 2
  const ey = b.top - 6
  const k = (ey - sy) / 2
  return `M${sx} ${sy} C${sx} ${sy + k} ${ex} ${ey - k} ${ex} ${ey}`
}

// How many hops each box sits from the start, by its longest way in.
export function depths(nodes: readonly FlowNode[], edges: readonly FlowEdge[]) {
  const depth = new Map(nodes.map((n) => [n.id, 0]))
  for (let pass = 0; pass < nodes.length; pass++) {
    for (const [from, to] of edges) {
      if (!depth.has(from) || !depth.has(to)) continue
      depth.set(to, Math.max(depth.get(to) ?? 0, (depth.get(from) ?? 0) + 1))
    }
  }
  return depth
}
