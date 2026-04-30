'use client'

// Two-row velocity-reactive parallax marquee. Each row's base translation is
// driven by Framer Motion's useAnimationFrame, then modulated by scroll
// velocity (useScroll → useVelocity → useSpring → useTransform). Scrolling
// down speeds the marquee in its base direction; scrolling up flips it.

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from 'framer-motion'
import { SkillIcon } from './SkillIcon'

interface Skill {
  name: string
  iconUrl: string
}

interface SkillsMarqueeProps {
  topRow: Skill[]
  bottomRow: Skill[]
}

interface MarqueeRowProps {
  skills: Skill[]
  baseVelocity: number
}

function MarqueeRow({ skills, baseVelocity }: MarqueeRowProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  // Wrap range must equal exactly one copy of the duplicated track for the
  // loop to be seamless. We render the list 4× below, so one copy = 25% of
  // the track width — hence wrap(-25, -50).
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const directionFactor = useRef(1)
  const [isHovered, setIsHovered] = useState(false)

  useAnimationFrame((_, delta) => {
    if (isHovered) return // pause-on-hover: skip translation while cursor is over the row

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    // Velocity polarity flips marquee direction on scroll-up.
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <motion.div className="inline-flex items-center" style={{ x }}>
        {[...skills, ...skills, ...skills, ...skills].map((s, i) => (
          <SkillIcon key={`${s.name}-${i}`} name={s.name} iconUrl={s.iconUrl} />
        ))}
      </motion.div>
    </div>
  )
}

export function SkillsMarquee({ topRow, bottomRow }: SkillsMarqueeProps) {
  return (
    <div className="space-y-3">
      <MarqueeRow skills={topRow} baseVelocity={-1} />
      <MarqueeRow skills={bottomRow} baseVelocity={1} />
    </div>
  )
}
