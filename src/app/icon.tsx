import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

// Tab icon: a tilde on white. In every terminal, ~ means home.
export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="63"
          height="63"
          x="0.5"
          y="0.5"
          rx="14"
          fill="#ffffff"
          stroke="#d1d5db"
        />
        <path
          d="M14 36 Q 23 26 32 34 Q 41 42 50 32"
          stroke="#111827"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
    {
      ...size,
    },
  )
}
