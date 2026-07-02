<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface GalleryItem {
  image: string
  text: string
}

const props = withDefaults(defineProps<{
  items?: GalleryItem[]
  scrollSpeed?: number
  scrollEase?: number
}>(), {
  scrollSpeed: 2,
  scrollEase: 0.05
})

// Gradient placeholders to avoid CORS / ORB blocking
const gradBg = (color1: string, color2: string) =>
  `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`

const defaultItems: GalleryItem[] = [
  { image: gradBg('#4a4e69', '#22223b'), text: 'Bridge' },
  { image: gradBg('#3d5a80', '#98c1d9'), text: 'Desk Setup' },
  { image: gradBg('#2a9d8f', '#264653'), text: 'Waterfall' },
  { image: gradBg('#e76f51', '#f4a261'), text: 'Strawberries' },
  { image: gradBg('#1d3557', '#457b9d'), text: 'Deep Diving' },
  { image: gradBg('#6d597a', '#b56576'), text: 'Train Track' },
  { image: gradBg('#2a9d8f', '#e9c46a'), text: 'Santorini' },
  { image: gradBg('#6c757d', '#adb5bd'), text: 'Blurry Lights' },
  { image: gradBg('#3a0ca3', '#4361ee'), text: 'New York' },
  { image: gradBg('#d62828', '#f77f00'), text: 'Good Boy' },
  { image: gradBg('#118ab2', '#073b4c'), text: 'Coastline' },
  { image: gradBg('#606c38', '#283618'), text: 'Palm Trees' }
]

const galleryItems = computed(() => (props.items && props.items.length > 0) ? props.items : defaultItems)

// Duplicate items for seamless infinite scroll
const duplicatedItems = computed(() => [...galleryItems.value, ...galleryItems.value])

const trackRef = ref<HTMLElement | null>(null)
const sceneRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)

// Scroll state matching original component logic
const scroll = ref({ current: 0, target: 0, last: 0 })
const autoScrollSpeed = computed(() => (props.scrollSpeed || 2) * 0.4)
const ease = computed(() => props.scrollEase || 0.05)

let rafId: number | null = null
let isDown = false
let startX = 0
let startScroll = 0

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t
}

function update() {
  scroll.value.last = scroll.value.current

  // Auto-scroll when not hovered
  if (!isHovered.value) {
    scroll.value.target += autoScrollSpeed.value
  }

  // Apply ease (lerp) for smooth motion
  scroll.value.current = lerp(scroll.value.current, scroll.value.target, ease.value)

  // Infinite loop: when scrolled past half the duplicated content, reset
  const trackEl = trackRef.value
  if (trackEl) {
    const halfWidth = trackEl.scrollWidth / 2
    if (scroll.value.current >= halfWidth) {
      scroll.value.current -= halfWidth
      scroll.value.target -= halfWidth
      scroll.value.last -= halfWidth
    }
    if (scroll.value.current < 0) {
      scroll.value.current += halfWidth
      scroll.value.target += halfWidth
      scroll.value.last += halfWidth
    }
  }

  // Apply transform
  if (trackEl) {
    trackEl.style.transform = `translate3d(${-scroll.value.current}px, 0, 0)`
  }

  rafId = requestAnimationFrame(update)
}

// Wheel interaction
function onWheel(e: WheelEvent) {
  e.preventDefault()
  scroll.value.target += e.deltaY * 0.5
}

// Drag interaction
function onPointerDown(e: PointerEvent) {
  isDown = true
  startX = e.clientX
  startScroll = scroll.value.target
  if (sceneRef.value) sceneRef.value.setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDown) return
  const dx = e.clientX - startX
  scroll.value.target = startScroll - dx
}

function onPointerUp(e: PointerEvent) {
  isDown = false
  if (sceneRef.value) sceneRef.value.releasePointerCapture(e.pointerId)
}

// Touch support
function onTouchStart(e: TouchEvent) {
  isDown = true
  startX = e.touches[0].clientX
  startScroll = scroll.value.target
}

function onTouchMove(e: TouchEvent) {
  if (!isDown) return
  const dx = e.touches[0].clientX - startX
  scroll.value.target = startScroll - dx
}

function onTouchEnd() {
  isDown = false
}

onMounted(() => {
  rafId = requestAnimationFrame(update)
  const el = sceneRef.value
  if (el) {
    el.addEventListener('wheel', onWheel, { passive: false })
  }
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  const el = sceneRef.value
  if (el) {
    el.removeEventListener('wheel', onWheel)
  }
})


</script>

<template>
  <section
    class="circular-gallery"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="gallery-scene" ref="sceneRef">
      <div class="gallery-track" ref="trackRef">
        <div
          v-for="(item, idx) in duplicatedItems"
          :key="`${item.text}-${idx}`"
          class="gallery-card"
        >
          <div class="card-media" :style="{ backgroundImage: item.image }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.circular-gallery {
  width: 100%;
  overflow: hidden;
  padding: 1.5rem 0;
  position: relative;
  cursor: grab;
}

.gallery-scene {
  overflow: visible;
}

.gallery-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  will-change: transform;
}

.gallery-card {
  flex-shrink: 0;
  width: clamp(160px, 16vw, 220px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.3s linear;
}

.gallery-card:hover {
  transform: scale(1.02);
}

.card-media {
  width: 100%;
  height: 140px;
  border-radius: 0;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s linear;
}

.gallery-card:hover .card-media {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-card {
    width: 160px;
  }

  .circular-gallery {
    padding: 1rem 0;
  }
}
</style>
