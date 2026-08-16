import { ImageResponse } from 'next/og'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/constants'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const hostname = new URL(siteConfig.url).hostname

// Same browser-window card as the site-wide OG image, with the
// project in the window: URL bar shows the project path, then the
// title, one-liner, and the award or event line.
export default async function Image({
  params,
}: {
  params: { slug: string }
}) {
  const project = projects.find((p) => p.slug === params.slug)
  const title = project?.title ?? 'Projects'
  const description = project?.description ?? ''
  const badge =
    project?.caseStudy?.awards?.[0]?.title ?? project?.event ?? project?.year

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
              {hostname}/projects/{params.slug}
            </div>
          </div>

          {/* Page content: project hero */}
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '0 80px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 980,
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: '#1f2937',
                  display: 'flex',
                }}
              >
                {title}
              </div>
              {description && (
                <div
                  style={{
                    marginTop: 24,
                    fontSize: 29,
                    lineHeight: 1.4,
                    color: '#6b7280',
                    display: 'flex',
                  }}
                >
                  {description}
                </div>
              )}
              {badge && (
                <div
                  style={{
                    marginTop: 36,
                    fontSize: 25,
                    fontWeight: 500,
                    color: '#3b82f6',
                    display: 'flex',
                  }}
                >
                  <span
                    style={{
                      borderBottom: '3px solid #93c5fd',
                      paddingBottom: 3,
                    }}
                  >
                    {badge}
                  </span>
                </div>
              )}
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
