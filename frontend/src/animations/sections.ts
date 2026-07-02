import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { AnimationContext } from '../composables/useAnimationSystem'

const triggers: ScrollTrigger[] = []

function createRevealTrigger(
  selector: string,
  animation: gsap.TweenVars,
  options?: {
    stagger?: number
    start?: string
    end?: string
    scrub?: boolean | number
    parallax?: boolean
  }
) {
  const elements = gsap.utils.toArray(selector) as HTMLElement[]
  if (!elements.length) return

  const stagger = options?.stagger || 0

  // Group elements by their direct parent so stagger is applied per section,
  // and elements across different sections each get their own ScrollTrigger.
  const groups = new Map<HTMLElement, HTMLElement[]>()
  elements.forEach((el) => {
    const parent = el.parentElement as HTMLElement
    if (!groups.has(parent)) groups.set(parent, [])
    groups.get(parent)!.push(el)
  })

  groups.forEach((group) => {
    // Use fromTo so the final state is explicitly visible, regardless of CSS
    // initial opacity set in style.css.
    const tween = gsap.fromTo(
      group,
      animation,
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: (animation.duration as number) || 1,
        ease: animation.ease || 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: group[0].parentElement || group[0],
          start: options?.start || 'top 80%',
          end: options?.end,
          scrub: options?.scrub,
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger)
    }
  })
}

export function initSectionAnimations(ctx: AnimationContext) {
  killSectionAnimations()

  if (ctx.reducedMotion) {
    gsap.set([
      '.gsap-section-label',
      '.gsap-section-title',
      '.gsap-section-desc',
      '.gsap-card',
      '.gsap-reveal',
      '.gsap-reveal-inner',
      '.gsap-stagger-item',
      '.gsap-parallax'
    ], { clearProps: 'all' })
    return
  }

  const baseDuration = ctx.lowPowerMode ? 0.6 : 1
  const baseEase = 'power3.out'
  const stagger = ctx.lowPowerMode ? 0.06 : 0.1

  // Section labels: subtle slide up
  createRevealTrigger(
    '.gsap-section-label',
    { y: 24, opacity: 0, duration: baseDuration * 0.7, ease: baseEase },
    { start: 'top 85%' }
  )

  // English titles: dramatic mask reveal + scale
  const titleElements = gsap.utils.toArray('.gsap-section-title') as HTMLElement[]
  titleElements.forEach((title) => {
    gsap.set(title, {
      clipPath: 'inset(0 100% 0 0)',
      scale: 1.05,
      opacity: 0
    })

    const tween = gsap.to(title, {
      clipPath: 'inset(0 0% 0 0)',
      scale: 1,
      opacity: 1,
      duration: ctx.lowPowerMode ? 0.7 : 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Section descriptions: fade up after title
  createRevealTrigger(
    '.gsap-section-desc',
    { y: 30, opacity: 0, duration: baseDuration * 0.8, ease: baseEase },
    { start: 'top 82%', stagger }
  )

  // Cards / rows: staggered entrance
  createRevealTrigger(
    '.gsap-card',
    { y: 60, opacity: 0, duration: baseDuration, ease: baseEase },
    { stagger, start: 'top 85%' }
  )

  // General stagger items
  createRevealTrigger(
    '.gsap-stagger-item',
    { y: 40, opacity: 0, duration: baseDuration * 0.8, ease: baseEase },
    { stagger, start: 'top 85%' }
  )

  // Image reveal: clip-path unveil with inner scale
  const revealElements = gsap.utils.toArray('.gsap-reveal') as HTMLElement[]
  revealElements.forEach((container) => {
    const inner = container.querySelector('.gsap-reveal-inner') as HTMLElement | null

    gsap.set(container, {
      clipPath: 'inset(100% 0 0 0)',
      opacity: 1
    })

    if (inner) {
      gsap.set(inner, { scale: 1.15, y: '-5%' })
    }

    const tween = gsap.to(container, {
      clipPath: 'inset(0% 0 0 0)',
      duration: ctx.lowPowerMode ? 0.8 : 1.4,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)

    if (inner && !ctx.lowPowerMode) {
      const parallaxTween = gsap.to(inner, {
        y: '5%',
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
      if (parallaxTween.scrollTrigger) triggers.push(parallaxTween.scrollTrigger)
    }
  })

  // Parallax elements (decorations, large text)
  if (!ctx.lowPowerMode) {
    const parallaxElements = gsap.utils.toArray('.gsap-parallax') as HTMLElement[]
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.gsapParallax || '0.1')
      const tween = gsap.to(el, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }
}

export function killSectionAnimations() {
  triggers.forEach((trigger) => trigger.kill())
  triggers.length = 0
}
