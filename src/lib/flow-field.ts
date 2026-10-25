// Evenly spaced streamlines (Jobard and Lefer, 1997) over a gentle current
// that runs left to right, so every line ends up heading for the link.

export type Point = [number, number]

const SEPARATION = 16
const TEST_RATIO = 0.5
const STEP = 3
const MIN_POINTS = 12
const MAX_STEPS = 1200

function angle(x: number, y: number) {
  return (
    0.55 * Math.sin(x * 0.011 + 1.7 * Math.sin(y * 0.019)) +
    0.35 * Math.cos(y * 0.023 - x * 0.006)
  )
}

export function streamlines(width: number, height: number): Point[][] {
  const cell = SEPARATION
  const cols = Math.ceil(width / cell) + 1
  const rows = Math.ceil(height / cell) + 1
  const grid: Point[][] = Array.from({ length: cols * rows }, () => [])

  const inside = ([x, y]: Point) => x >= 0 && x <= width && y >= 0 && y <= height

  // True when no point on an accepted line is closer than `d`.
  const clear = ([x, y]: Point, d: number) => {
    const cx = Math.floor(x / cell)
    const cy = Math.floor(y / cell)
    for (let i = cx - 1; i <= cx + 1; i++) {
      for (let j = cy - 1; j <= cy + 1; j++) {
        if (i < 0 || j < 0 || i >= cols || j >= rows) continue
        for (const [px, py] of grid[j * cols + i]) {
          if (Math.hypot(px - x, py - y) < d) return false
        }
      }
    }
    return true
  }

  const trace = (seed: Point, dir: 1 | -1) => {
    const out: Point[] = []
    let [x, y] = seed
    for (let s = 0; s < MAX_STEPS; s++) {
      const a = angle(x, y)
      const next: Point = [x + dir * STEP * Math.cos(a), y + dir * STEP * Math.sin(a)]
      if (!inside(next) || !clear(next, SEPARATION * TEST_RATIO)) break
      // Stop a line that curls back onto itself.
      if (out.length > 8 && out.slice(0, -6).some(([px, py]) => Math.hypot(px - next[0], py - next[1]) < SEPARATION * TEST_RATIO)) break
      out.push(next)
      ;[x, y] = next
    }
    return out
  }

  const lines: Point[][] = []
  const queue: Point[] = [[width / 2, height / 2]]
  for (let gx = cell / 2; gx < width; gx += cell * 2) {
    for (let gy = cell / 2; gy < height; gy += cell * 2) queue.push([gx, gy])
  }

  while (queue.length) {
    const seed = queue.shift()!
    if (!inside(seed) || !clear(seed, SEPARATION)) continue
    const line = [...trace(seed, -1).reverse(), seed, ...trace(seed, 1)]
    if (line.length < MIN_POINTS) continue
    lines.push(line)
    for (const p of line) {
      grid[Math.floor(p[1] / cell) * cols + Math.floor(p[0] / cell)].push(p)
    }
    // New seeds one separation away on both sides of the line.
    const every = Math.max(1, Math.round(SEPARATION / STEP))
    const fresh: Point[] = []
    for (let i = 0; i < line.length; i += every) {
      const a = angle(line[i][0], line[i][1])
      const nx = -Math.sin(a) * SEPARATION
      const ny = Math.cos(a) * SEPARATION
      fresh.push([line[i][0] + nx, line[i][1] + ny], [line[i][0] - nx, line[i][1] - ny])
    }
    queue.unshift(...fresh)
  }
  return lines
}

export function toPath(line: Point[]) {
  return line
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join('')
}
