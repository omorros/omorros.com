import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const runtime = 'edge'

export const alt = `${siteConfig.name} · ${siteConfig.subtitle}`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const hostname = new URL(siteConfig.url).hostname

// The card is a mini browser window showing the site itself: traffic
// lights, URL bar, then the homepage hero with name, subtitle, nav
// links, and the headshot. Light theme, matching the real site.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 44,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #d1d5db',
            boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '18px 24px',
              borderBottom: '1px solid #e5e7eb',
              background: '#f9fafb',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#f87171',
                display: 'flex',
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#fbbf24',
                display: 'flex',
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#34d399',
                display: 'flex',
              }}
            />
            <div
              style={{
                marginLeft: 22,
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 999,
                padding: '9px 20px',
                fontSize: 21,
                color: '#6b7280',
              }}
            >
              <span style={{ color: '#9ca3af', display: 'flex' }}>🔒</span>
              {hostname}
            </div>
          </div>

          {/* Page content: homepage hero */}
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '0 80px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 84,
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: '#1f2937',
                  display: 'flex',
                }}
              >
                Oriol Morros Vilaseca
              </div>
              <div
                style={{
                  marginTop: 22,
                  fontSize: 30,
                  color: '#6b7280',
                  display: 'flex',
                }}
              >
                Software Engineer · London, UK
              </div>
              <div
                style={{
                  marginTop: 40,
                  display: 'flex',
                  gap: 34,
                  fontSize: 26,
                  fontWeight: 500,
                  color: '#3b82f6',
                }}
              >
                <span
                  style={{
                    borderBottom: '3px solid #93c5fd',
                    paddingBottom: 3,
                  }}
                >
                  Projects
                </span>
                <span
                  style={{
                    borderBottom: '3px solid #93c5fd',
                    paddingBottom: 3,
                  }}
                >
                  Work
                </span>
                <span
                  style={{
                    borderBottom: '3px solid #93c5fd',
                    paddingBottom: 3,
                  }}
                >
                  Journal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
