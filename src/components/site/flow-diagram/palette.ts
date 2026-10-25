import type { Swatch } from './types'

// The colours a diagram can use. Grey follows the site's palette, so it
// changes with night mode; the rest read on both backgrounds.
export const SWATCHES: Record<Swatch, string> = {
  grey: 'rgb(var(--gray-500))',
  blue: '#3b82f6',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  green: '#10b981',
  rose: '#f43f5e',
}
