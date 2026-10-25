import { defineProject } from './schema'

export default defineProject({
  title: 'Lantern',
  description: 'A dispatch tool that briefs firefighters on a burning building before they arrive, from its old property listing.',
  tags: ['Python', 'Next.js', 'FastAPI', 'OpenAI'],
  link: 'https://github.com/omorros/Lantern',
  slug: 'lantern',
  lastModified: '2026-08-29',
  category: 'hackathon',
  event: '{Tech: Europe} \u00d7 VEED Hackathon \u00b7 London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'When firefighters arrive at a house fire they know nothing about the inside. No floor plan, no idea which room someone is trapped in, so they find out by crawling through the smoke. Last year 271 people died in fires in England, and nearly eight in ten of them died at home.',
    approach: 'We built a dispatch console that fills in the building while the caller is still on the line: an agent finds the house in old sold listings, reads the floor plan and the photos, and turns them into a briefing with the way in, the room the victim was reported in, and a route from the kerb. Every fact on the brief says whether it came from the call, from the listing, or from a model, so nobody mistakes a guess for the truth.',
    features: [
      { title: 'Finds the House Online', description: 'An agent drives a real browser, searches sold property listings, and pulls the floor plan and the photos from the day the house was last on the market.' },
      { title: 'Reads the Call as It Happens', description: 'The address, the hazard, and where the person was last seen come straight out of the live transcript in milliseconds, and the brief moves when the caller says something new.' },
      { title: 'A Route, Not Just a Plan', description: 'It says which door to go through and which rooms to cross to reach the victim, because crews given a route move faster than crews handed a floor plan.' },
      { title: 'Rooms You Can Walk First', description: 'The photos of the rooms that matter become 3D scenes with the hazards pinned, and a 30 second briefing video reaches the crew before the truck leaves.' }
    ],
    thumbnail: { src: '/images/lantern/presenting.jpg', alt: "Presenting Lantern beside a screen showing a building's rooms" },
    cardImage: { src: '/images/lantern/team-veed.jpg', alt: 'The Lantern team under the VEED neon sign at the {Tech: Europe} × VEED Hackathon' },
    photos: [
      { src: '/images/lantern/team-veed.jpg', alt: 'The Lantern team under the VEED neon sign at the {Tech: Europe} × VEED Hackathon' },
      { src: '/images/lantern/team-building.jpg', alt: 'The team building Lantern around a table of laptops and drinks' },
      { src: '/images/lantern/h-company.jpg', alt: 'Two people smiling with thumbs up at the hackathon' },
      { src: '/images/lantern/working.jpg', alt: 'Working on Lantern on a laptop during the hackathon' },
    ],
    awards: [
      {
        title: 'Overall Winner - {Tech: Europe} x VEED Hackathon 2026',
        prizes: ['Overall Winner'],
        description: 'First across the whole event, a one day hackathon with 80 people at the Summer Lock-In in London.'
      },
      {
        title: 'Best Use of fal',
        prizes: ['Best Use of fal'],
        description: 'A second prize at the same event, for turning the listing photos into 3D rooms and generating the crew briefing video.'
      }
    ]
  }
})
