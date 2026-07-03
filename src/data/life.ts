export interface Place {
  city: string
  years: string
  photo: string
  alt: string
}

// Swap the .svg placeholders for real photos when the user uploads them.
export const places: Place[] = [
  {
    city: 'London',
    years: '2026 to now',
    photo: '/life/london.svg',
    alt: 'London',
  },
  {
    city: 'Cambridge',
    years: '2023 to 2026',
    photo: '/life/cambridge.svg',
    alt: 'Cambridge',
  },
  {
    city: 'Manresa',
    years: '2005 to 2023',
    photo: '/life/manresa.svg',
    alt: 'Manresa, near Barcelona',
  },
]
