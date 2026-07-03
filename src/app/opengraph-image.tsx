import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const runtime = 'edge'

export const alt = `${siteConfig.name} · ${siteConfig.subtitle}`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        {/* Top row: domain + availability */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          <span style={{ color: '#9ca3af' }}>omorros.com</span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#d1d5db',
              border: '1px solid #262626',
              borderRadius: 999,
              padding: '8px 18px',
              fontSize: 15,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#22c55e',
                display: 'flex',
              }}
            />
            Available
          </span>
        </div>

        {/* Center: name + positioning */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: '#fff',
            }}
          >
            Oriol Morros Vilaseca
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.3,
              color: '#d1d5db',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'baseline',
              gap: 14,
            }}
          >
            <span>Software Engineer</span>
            <span style={{ color: '#525252' }}>|</span>
            <span style={{ color: '#fff', fontWeight: 500 }}>
              Building infrastructure for AI agents.
            </span>
          </div>
        </div>

        {/* Bottom: credibility strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            color: '#9ca3af',
          }}
        >
          <span>
            <span style={{ color: '#fff' }}>18</span> PRs to IBM MCP Context Forge
          </span>
          <span style={{ color: '#404040' }}>·</span>
          <span>Eli by Techbible</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
