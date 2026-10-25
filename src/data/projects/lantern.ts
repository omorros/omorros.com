import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'Lantern',
  description: 'A dispatch tool that briefs firefighters on a burning building before they arrive, from its old property listing.',
  tags: ['Python', 'Next.js', 'FastAPI', 'OpenAI'],
  link: 'https://github.com/omorros/Lantern',
  slug: 'lantern',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: '{Tech: Europe} × VEED Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/lantern/team-veed.jpg', alt: 'The three Lantern teammates with their arms around each other under the VEED neon sign' },
    cardImage: { src: '/images/lantern/team-veed.jpg', alt: 'The three Lantern teammates with their arms around each other under the VEED neon sign' },
    photos: [
      { src: '/images/lantern/presenting.jpg', alt: "Presenting Lantern beside a screen showing photos of a building's rooms" },
      { src: '/images/lantern/team-building.jpg', alt: 'The team building Lantern around a table of laptops and drinks' },
      { src: '/images/lantern/h-company.jpg', alt: 'With Abai, a friend from H Company who was at the hackathon, both giving a thumbs up' },
      { src: '/images/lantern/working.jpg', alt: 'Working on Lantern on a laptop during the hackathon' },
    ],
    story: {
      insight: 'Know the building before you go through the door.',
      facts: [
        { label: 'Stack', value: 'Python, FastAPI, Next.js, Playwright, OpenAI, fal' },
      ],
      context: 'Firefighters often go into a burning building blind: no floor plan, no idea where the fire started or which room the person they are looking for is in. Yet the outside of almost every UK building is on Street View, and the inside of many homes was photographed for an old property listing. Lantern joins the two during the 999 call. Size-up is the fire service word for the quick read of a building on arrival; we moved it to before the truck leaves.',
      flow: defineFlow({
        tones: {
          call: { swatch: 'blue', label: 'The call' },
          building: { swatch: 'violet', label: 'The building' },
          brief: { swatch: 'amber', label: 'The brief' },
        },
        nodes: [
          { id: 'stt', label: 'Speech to text', note: 'The caller, as it happens', detail: 'OpenAI · gpt-4o-mini-transcribe', live: '"The kitchen\'s on fire."', tone: 'call', col: 0, row: 1, service: true },
          { id: 'extract', label: 'GLiNER2', note: 'Finds the address, fire and casualty', detail: 'Pioneer · every fragment', live: 'Casualty: back bedroom', tone: 'call', col: 1, row: 1, service: true },
          { id: 'outside', label: 'Outside', note: 'Reads the street and the plot', detail: 'Google Maps · gpt-5', live: 'Door on the left, no rear access', tone: 'building', col: 2, row: 0 },
          { id: 'agent', label: 'Listing agent', note: 'Finds the house in old sold listings', detail: 'Holo 3.1 · Playwright', steps: ['listing found', 'floor plan pulled'], live: '12 photos and a floor plan', tone: 'building', col: 2, row: 2 },
          { id: 'rooms', label: 'Room graph', note: 'Every room, its doors, its photos', detail: 'gpt-5 points · code draws', live: '8 rooms, 3 ways in', tone: 'building', col: 3, row: 2 },
          { id: 'route', label: 'Route', note: 'From the kerb to the casualty', detail: 'along the room graph', live: 'Front door, 5 waypoints', tone: 'brief', col: 4, row: 1 },
          { id: 'brief', label: 'Crew brief', note: 'Each line marked by its source', detail: 'VEED and Kling on fal', live: '30s brief ready', tone: 'brief', col: 4, row: 2 },
        ],
        edges: [
          ['stt', 'extract'],
          ['extract', 'outside'],
          ['extract', 'agent'],
          ['extract', 'route'],
          ['outside', 'route'],
          ['agent', 'rooms'],
          ['rooms', 'route'],
          ['route', 'brief'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Mykyta Yakivets', url: 'https://www.linkedin.com/in/mykyta-yakivets/' },
        { name: 'Bill', url: 'https://www.linkedin.com/in/ton-hoang-nguyen/' },
      ],
      decisions: [
        {
          title: 'The model points, code draws the rooms',
          why: 'gpt-5 reads the floor plan and points at each room label on a grid. The rooms themselves are worked out without it: the walls are thickened until the door gaps close, then each room is filled outwards from its label.',
          tradeoff: 'More code than asking the model for boxes, and the wall thickness is one fixed number. When the fill fails, we fall back to the box the model drew.',
        },
        {
          title: 'Every line says where it came from',
          why: 'Each line of the crew brief is marked call, street, listing or plan: what the caller said this minute, what Street View shows, what an old listing shows, or our own inference from those. Listing and plan lines are shown fainter.',
          tradeoff: 'A listing can be years out of date, so the layout, one of the most useful parts of the brief, always arrives marked as the least certain.',
        },
        {
          title: 'A saved result behind every stage',
          why: 'We picked five sold houses, ran each one through the whole live pipeline on the day, and saved every stage. If a service fails or a key is missing during the demo, that stage replays its saved result and the brief still arrives.',
          tradeoff: 'Those five houses are all the agent was tested on, so we have no success rate to quote.',
        },
      ],
    },
    awards: [
      {
        title: 'Overall Winner - {Tech: Europe} \u00d7 VEED Hackathon 2026',
        prizes: ['Overall Winner'],
        description: 'First place overall at the {Tech: Europe} \u00d7 VEED Summer Lock-In in London.',
      },
      {
        title: 'Best Use of fal',
        prizes: ['Best Use of fal'],
        description: 'A second prize at the same event. The crew brief video is made on fal.',
      },
    ],
  },
})
