import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

// Home-screen icon: same slash, full-bleed white square
// (iOS applies its own corner rounding).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg
        width="180"
        height="180"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" fill="#ffffff" />
        <path
          d="M40 14 L24 50"
          stroke="#111827"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    ),
    {
      ...size,
    },
  )
}
