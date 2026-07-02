<script setup lang="ts">
import { computed } from 'vue'

interface GlitchTextProps {
  text: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

const props = withDefaults(defineProps<GlitchTextProps>(), {
  speed: 0.5,
  enableShadows: true,
  enableOnHover: false,
  className: ''
})

const inlineStyles = computed(() => ({
  '--after-duration': `${props.speed * 3}s`,
  '--before-duration': `${props.speed * 2}s`,
  '--after-shadow': props.enableShadows ? '-2px 0 rgba(139, 92, 246, 0.7)' : 'none',
  '--before-shadow': props.enableShadows ? '2px 0 rgba(59, 130, 246, 0.45)' : 'none'
}))

const hoverClass = computed(() => props.enableOnHover ? 'enable-on-hover' : '')
</script>

<template>
  <span
    class="glitch"
    :class="[hoverClass, className]"
    :style="inlineStyles"
    :data-text="text"
  >
    {{ text }}
  </span>
</template>

<style>
.glitch {
  color: #fff;
  white-space: nowrap;
  position: relative;
  display: inline-block;
}

.glitch::after,
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: transparent;
  overflow: hidden;
  pointer-events: none;
}

.glitch:not(.enable-on-hover)::after {
  animation: glitch-jitter var(--after-duration, 3s) infinite ease-in-out alternate-reverse;
  text-shadow: var(--after-shadow, -2px 0 rgba(139, 92, 246, 0.7));
}

.glitch:not(.enable-on-hover)::before {
  animation: glitch-jitter var(--before-duration, 2.2s) infinite ease-in-out alternate-reverse;
  text-shadow: var(--before-shadow, 2px 0 rgba(59, 130, 246, 0.45));
}

.glitch.enable-on-hover::after,
.glitch.enable-on-hover::before {
  content: '';
  opacity: 0;
  animation: none;
}

.glitch.enable-on-hover:hover::after {
  content: attr(data-text);
  opacity: 1;
  animation: glitch-jitter var(--after-duration, 3s) infinite ease-in-out alternate-reverse;
  text-shadow: var(--after-shadow, -2px 0 rgba(139, 92, 246, 0.7));
}

.glitch.enable-on-hover:hover::before {
  content: attr(data-text);
  opacity: 1;
  animation: glitch-jitter var(--before-duration, 2.2s) infinite ease-in-out alternate-reverse;
  text-shadow: var(--before-shadow, 2px 0 rgba(59, 130, 246, 0.45));
}

@keyframes glitch-jitter {
  0%, 100% {
    transform: translate(0, 0) skewX(0deg);
    clip-path: inset(0 0 0 0);
  }
  10% {
    transform: translate(-1px, 1px) skewX(-0.8deg);
    clip-path: inset(8% 0 85% 0);
  }
  20% {
    transform: translate(1px, -1px) skewX(0.5deg);
    clip-path: inset(75% 0 10% 0);
  }
  30% {
    transform: translate(-1px, 0) skewX(-0.5deg);
    clip-path: inset(40% 0 50% 0);
  }
  40% {
    transform: translate(0, 1px) skewX(0.3deg);
    clip-path: inset(15% 0 75% 0);
  }
  50% {
    transform: translate(1px, -1px) skewX(-0.3deg);
    clip-path: inset(60% 0 30% 0);
  }
  60% {
    transform: translate(0, 0) skewX(0deg);
    clip-path: inset(25% 0 65% 0);
  }
  70% {
    transform: translate(-1px, 1px) skewX(0.6deg);
    clip-path: inset(85% 0 8% 0);
  }
  80% {
    transform: translate(1px, 0) skewX(-0.4deg);
    clip-path: inset(50% 0 40% 0);
  }
  90% {
    transform: translate(0, -1px) skewX(0.2deg);
    clip-path: inset(5% 0 88% 0);
  }
}
</style>