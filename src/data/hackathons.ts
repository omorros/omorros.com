import { hackathonProjects } from '@/data/projects'

// The hackathon record, derived from the project files: one entry per prize,
// in /hackathons order. Lantern and OffBabel each won two.
export const HACKATHON_PRIZES = hackathonProjects.flatMap((p) =>
  (p.caseStudy?.awards ?? []).flatMap((a) =>
    (a.prizes ?? []).map((award) => ({ award, project: p.title })),
  ),
)

export type HackathonPrize = (typeof HACKATHON_PRIZES)[number]

export const HACKATHON_WINS = HACKATHON_PRIZES.length

// Distinct events, so two builds from one hackathon would still count once.
export const HACKATHON_COUNT = new Set(hackathonProjects.map((p) => p.event)).size
