'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'

interface GsapRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'top' | 'left' | 'right' | 'fade'
  duration?: number
  stagger?: number
  staggerChildren?: boolean
}

export function GsapReveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
  duration = 0.8,
  stagger = 0.12,
  staggerChildren = false,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!ref.current) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    }

    if (from === 'bottom') fromVars.y = 28
    if (from === 'top') fromVars.y = -28
    if (from === 'left') fromVars.x = -28
    if (from === 'right') fromVars.x = 28

    const targets = staggerChildren
      ? Array.from(ref.current.children)
      : ref.current

    // Kill any existing tweens on these targets so re-navigation always restarts cleanly
    gsap.killTweensOf(targets)

    gsap.fromTo(targets, fromVars, {
      ...toVars,
      stagger: staggerChildren ? stagger : 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
