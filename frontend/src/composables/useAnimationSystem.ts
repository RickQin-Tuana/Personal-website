import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initHeroAnimation, killHeroAnimation } from '../animations/hero'
import { initSectionAnimations, killSectionAnimations } from '../animations/sections'

export interface AnimationContext {
  reducedMotion: boolean
  lowPowerMode: boolean
  isMobile: boolean
  supports3D: boolean
}

let isInitialized = false
let context: AnimationContext | null = null
let monitorCleanup: (() => void) | null = null
let mediaCleanup: (() => void) | null = null

/**
 * Detect device capabilities for animation降级
 */
function detectContext(): AnimationContext {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768

  // Low-power detection: low memory, low cores, or save-data
  const memory = (navigator as any).deviceMemory
  const cores = navigator.hardwareConcurrency || 4
  const saveData = (navigator as any).connection?.saveData

  const lowPowerMode = reducedMotion || saveData || (memory && memory <= 4) || cores <= 4
  const supports3D = !reducedMotion && !lowPowerMode

  return { reducedMotion, lowPowerMode, isMobile, supports3D }
}

/**
 * Monitor animation frame rate
 */
function initPerformanceMonitor(): () => void {
  let frameCount = 0
  let lastTime = performance.now()
  let rafId: number
  let slowFrames = 0

  const check = () => {
    const now = performance.now()
    frameCount++

    if (now - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime))
      frameCount = 0
      lastTime = now

      if (fps < 45) {
        slowFrames++
        if (slowFrames >= 3 && context && !context.lowPowerMode) {
          console.warn('[AnimationSystem] FPS degraded, switching to low-power mode')
          context.lowPowerMode = true
          // Refresh animations with降级 settings on next interaction/scroll
        }
      } else {
        slowFrames = Math.max(0, slowFrames - 1)
      }
    }

    rafId = requestAnimationFrame(check)
  }

  rafId = requestAnimationFrame(check)

  return () => cancelAnimationFrame(rafId)
}

function setupAnimations() {
  if (isInitialized) return

  gsap.registerPlugin(ScrollTrigger)
  context = detectContext()
  isInitialized = true

  // Initialize hero opening animation immediately
  initHeroAnimation(context)

  // Initialize scroll-triggered section animations after a brief delay
  // to prioritize hero rendering
  requestAnimationFrame(() => {
    initSectionAnimations(context!)
  })

  // Start performance monitor in non-reduced-motion environments
  if (!context.reducedMotion) {
    monitorCleanup = initPerformanceMonitor()
  }

  // Listen for reduced-motion changes
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handleChange = (e: MediaQueryListEvent) => {
    context = { ...context!, reducedMotion: e.matches }
    if (e.matches) {
      // Kill all active animations and reset transforms
      killHeroAnimation()
      killSectionAnimations()
      gsap.set([
        '.gsap-hero-line',
        '.gsap-section-label',
        '.gsap-section-title',
        '.gsap-section-desc',
        '.gsap-card',
        '.gsap-reveal',
        '.gsap-reveal-inner'
      ], { clearProps: 'all' })
    }
  }
  mediaQuery.addEventListener('change', handleChange)
  mediaCleanup = () => mediaQuery.removeEventListener('change', handleChange)
}

function teardownAnimations() {
  if (mediaCleanup) mediaCleanup()
  killHeroAnimation()
  killSectionAnimations()
  if (monitorCleanup) monitorCleanup()
  ScrollTrigger.getAll().forEach((st) => st.kill())
  isInitialized = false
  context = null
}

export function useAnimationSystem() {
  onMounted(setupAnimations)
  onUnmounted(teardownAnimations)
}

/**
 * Refresh scroll-triggered animations. Useful when dynamic content (e.g. API data)
 * renders after the initial animation setup.
 */
export function refreshSectionAnimations() {
  if (!context) return
  // Kill existing section triggers only and re-initialize
  killSectionAnimations()
  initSectionAnimations(context)
  // Recalculate all ScrollTrigger positions
  ScrollTrigger.refresh()
}

export function getAnimationContext(): AnimationContext | null {
  return context
}
