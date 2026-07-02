import { gsap } from 'gsap'
import type { AnimationContext } from '../composables/useAnimationSystem'

let heroTl: gsap.core.Timeline | null = null

export function initHeroAnimation(ctx: AnimationContext) {
  killHeroAnimation()

  if (ctx.reducedMotion) {
    // Ensure everything is visible immediately
    gsap.set('.gsap-hero-line', { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0% 0 0)' })
    return
  }

  const duration = ctx.lowPowerMode ? 0.8 : 1.2
  const stagger = ctx.lowPowerMode ? 0.08 : 0.12
  const ease = 'power3.out'
  const elasticEase = 'power2.out'

  // Set initial states
  gsap.set('.gsap-hero-line', { opacity: 0 })
  gsap.set('.gsap-hero-headline', {
    clipPath: 'inset(0 100% 0 0)',
    y: ctx.supports3D ? 30 : 0
  })
  gsap.set('.gsap-hero-subtitle', { y: 40, opacity: 0, scale: 0.96 })
  gsap.set('.gsap-hero-desc', { y: 30, opacity: 0 })
  gsap.set('.gsap-hero-star', { scale: 0, rotation: -90, opacity: 0 })
  gsap.set('.gsap-hero-gallery', { y: 60, opacity: 0 })

  heroTl = gsap.timeline({
    defaults: { ease, duration },
    delay: 0.2 // Allow layout/paint to settle
  })

  // 1. Main headline mask reveal + slight compression-to-normal
  heroTl.to('.gsap-hero-headline', {
    clipPath: 'inset(0 0% 0 0)',
    y: 0,
    opacity: 1,
    duration: ctx.lowPowerMode ? 0.7 : 1.1,
    ease: elasticEase
  })

  // 2. Subtitle: compressed then elastic归位
  heroTl.to(
    '.gsap-hero-subtitle',
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: ctx.lowPowerMode ? 0.6 : 0.9,
      ease: 'power3.out'
    },
    ctx.lowPowerMode ? '-=0.4' : '-=0.6'
  )

  // 3. Description lines stagger in
  heroTl.to(
    '.gsap-hero-desc',
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger
    },
    '-=0.5'
  )

  // 4. Stars pop in with rotation (smooth, no cheap bounce)
  heroTl.to(
    '.gsap-hero-star',
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out'
    },
    '-=0.6'
  )

  // 5. Gallery slides up
  heroTl.to(
    '.gsap-hero-gallery',
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    },
    '-=0.5'
  )
}

export function killHeroAnimation() {
  if (heroTl) {
    heroTl.kill()
    heroTl = null
  }
}
