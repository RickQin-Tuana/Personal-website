<template>
  <div
    class="lamp-bg-wrapper"
    :style="wrapperStyle"
  >
    <LampEffect
      class="lamp-bg"
      :delay="delay"
      :duration="duration"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import LampEffect from './inspira/LampEffect.vue'

const props = withDefaults(defineProps<{
  delay?: number
  duration?: number
}>(), {
  delay: 0.5,
  duration: 0.8
})

const scrollY = ref(0)

const wrapperStyle = computed(() => ({
  transform: `translateY(${-scrollY.value * 0.5}px)`,
  opacity: Math.max(0, 1 - scrollY.value / 600)
}))

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.lamp-bg-wrapper {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: transform, opacity;
}

.lamp-bg {
  position: absolute !important;
  inset: 0 !important;
  z-index: 0;
}
</style>
