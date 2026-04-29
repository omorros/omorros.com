export interface Hackathon {
  year: string
  event: string
  location: string
  built: string
  placement?: string
  link?: string
}

export const hackathons: Hackathon[] = [
  {
    year: '2025',
    event: 'HackUPC',
    location: 'Barcelona',
    built: 'Multimodal accessibility tool - vision LLM describes scenes and reads them back via voice.',
    placement: 'Top 10 finalist',
  },
  {
    year: '2024',
    event: 'HackCambridge',
    location: 'Cambridge',
    built: 'Realtime study-room finder using campus floorplan + occupancy sensors.',
    placement: 'Best Hardware Hack',
  },
]
