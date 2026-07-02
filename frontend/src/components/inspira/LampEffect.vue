<template>
  <div
    :class="
      cn(
        'lamp-effect',
        $props.class,
      )
    "
  >
    <div class="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
      <!-- Conic Gradient Left -->
      <div
        :style="{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }"
        class="animate-conic-gradient bg-gradient-conic absolute inset-auto right-1/2 h-56 w-60 overflow-visible from-purple-500 via-transparent to-transparent text-white opacity-50 [--conic-position:from_88deg_at_center_top]"
      >
        <div
          class="absolute bottom-0 left-0 z-20 h-40 w-full bg-[#120a1f] [mask-image:linear-gradient(to_top,white,transparent)]"
        />
        <div
          class="absolute bottom-0 left-0 z-20 h-full w-40 bg-[#120a1f] [mask-image:linear-gradient(to_right,white,transparent)]"
        />
      </div>

      <!-- Conic Gradient Right -->
      <div
        :style="{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }"
        class="animate-conic-gradient bg-gradient-conic absolute inset-auto left-1/2 h-56 w-60 from-transparent via-transparent to-purple-500 text-white opacity-50 [--conic-position:from_272deg_at_center_top]"
      >
        <div
          class="absolute bottom-0 right-0 z-20 h-full w-40 bg-[#120a1f] [mask-image:linear-gradient(to_left,white,transparent)]"
        />
        <div
          class="absolute bottom-0 right-0 z-20 h-40 w-full bg-[#120a1f] [mask-image:linear-gradient(to_top,white,transparent)]"
        />
      </div>

      <div
        class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#120a1f] blur-2xl"
      ></div>

      <div
        class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"
      ></div>

      <div
        class="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-purple-500 opacity-50 blur-3xl"
      ></div>

      <!-- Spotlight -->
      <div
        class="animate-spotlight absolute inset-auto z-30 h-36 w-32 -translate-y-24 rounded-full bg-purple-400 blur-2xl"
      ></div>

      <!-- Glowing Line -->
      <div
        class="animate-glowing-line absolute inset-auto z-50 h-0.5 w-60 -translate-y-28 bg-purple-400"
      ></div>

      <div class="absolute inset-auto z-40 h-44 w-full translate-y-[-12.5rem] bg-[#120a1f]"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

interface LampEffectProps {
  delay?: number;
  duration?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<LampEffectProps>(), {
  delay: 0.5,
  duration: 0.8,
});

const durationInSeconds = computed(() => `${props.duration}s`);
const delayInSeconds = computed(() => `${props.delay}s`);
</script>

<style scoped>
.lamp-effect {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 160px;
  overflow: hidden;
  background-color: #120a1f;
  pointer-events: none;
}

/* Spotlight Animation */
.animate-spotlight {
  animation: spotlight-anim ease-in-out v-bind(durationInSeconds) forwards;
  animation-delay: v-bind(delayInSeconds);
}

/* Glowing Line Animation */
.animate-glowing-line {
  animation: glowing-line-anim ease-in-out v-bind(durationInSeconds) forwards;
  animation-delay: v-bind(delayInSeconds);
}

/* Conic Gradient Animation */
.animate-conic-gradient {
  animation: conic-gradient-anim ease-in-out v-bind(durationInSeconds) forwards;
  animation-delay: v-bind(delayInSeconds);
}

/* Keyframes for Spotlight */
@keyframes spotlight-anim {
  from {
    width: 8rem;
  }
  to {
    width: 16rem;
  }
}

/* Keyframes for Glowing Line */
@keyframes glowing-line-anim {
  from {
    width: 15rem;
  }
  to {
    width: 30rem;
  }
}

/* Keyframes for Conic Gradient */
@keyframes conic-gradient-anim {
  from {
    opacity: 0.5;
    width: 15rem;
  }
  to {
    opacity: 1;
    width: 30rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-spotlight,
  .animate-glowing-line,
  .animate-conic-gradient {
    animation: none;
    opacity: 1;
  }
}
</style>
