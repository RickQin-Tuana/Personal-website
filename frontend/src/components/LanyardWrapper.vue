<template>
  <div ref="container" class="lanyard-slot">
    <div class="lanyard-drop" :class="{ dropped }">
      <div ref="inner" class="lanyard-inner" :style="innerStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { createRoot, type Root } from 'react-dom/client'
import { createElement } from 'react'
import Lanyard from './Lanyard'

interface Props {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: () => [0, 0, 30],
  gravity: () => [0, -40, 0],
  fov: 20,
  transparent: true,
  frontImage: null,
  backImage: null,
  imageFit: 'cover',
  lanyardImage: null,
  lanyardWidth: 0.6
})

const inner = ref<HTMLDivElement>()
const scrollY = ref(0)
const dropped = ref(false)
let root: Root | null = null

const innerStyle = computed(() => ({
  transform: `translateY(${-scrollY.value * 0.5}px)`,
  opacity: Math.max(0, 1 - scrollY.value / 600)
}))

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const renderLanyard = () => {
  if (!inner.value) return
  if (!root) {
    root = createRoot(inner.value)
  }
  root.render(
    createElement(Lanyard, {
      position: props.position,
      gravity: props.gravity,
      fov: props.fov,
      transparent: props.transparent,
      frontImage: props.frontImage,
      backImage: props.backImage,
      imageFit: props.imageFit,
      lanyardImage: props.lanyardImage,
      lanyardWidth: props.lanyardWidth
    })
  )
}

onMounted(() => {
  renderLanyard()
  window.addEventListener('scroll', handleScroll, { passive: true })
  requestAnimationFrame(() => {
    dropped.value = true
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  root?.unmount()
})

watch(props, renderLanyard, { deep: true })
</script>
