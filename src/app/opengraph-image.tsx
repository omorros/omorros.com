import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const runtime = 'edge'

export const alt = siteConfig.name
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
          background: 'linear-gradient(to bottom right, #050505, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '40px 80px',
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: '0 0 80px -20px #8f46db',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: 'linear-gradient(to bottom right, #ffffff, #999999)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 20,
              letterSpacing: '-0.02em',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#90caf9',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            {siteConfig.subtitle}
          </div>
        </div>
        
        {/* Simple decorative elements */}
        <div style={{ position: 'absolute', top: 40, left: 40, width: 20, height: 20, borderRadius: '50%', background: '#8f46db', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 20, height: 20, borderRadius: '50%', background: '#90caf9', opacity: 0.5 }} />
      </div>
    ),
    {
      ...size,
    }
  )
}
