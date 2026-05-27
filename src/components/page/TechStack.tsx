'use client'

import { SectionHeader } from './SectionHeader'
import { SkillsMarquee } from '@/components/ui/SkillsMarquee'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { techStackTopRow, techStackBottomRow } from '@/data/skills'

export function TechStack() {
  return (
    <RevealOnScroll as="section" className="py-12">
      <SectionHeader title="Tech Stack" />
      <div className="w-full -mx-6 md:-mx-0 overflow-hidden mt-6">
        <SkillsMarquee topRow={techStackTopRow} bottomRow={techStackBottomRow} />
      </div>
    </RevealOnScroll>
  )
}
