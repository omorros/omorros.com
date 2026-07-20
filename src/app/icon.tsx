import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

// Tab icon: a single slash on white. The / in every URL.
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
