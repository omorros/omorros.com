import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

// Home-screen icon: same OM monogram as the favicon, square canvas
// (iOS applies its own corner rounding).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        OM
      </div>
    ),
    {
      ...size,
    },
  )
}
