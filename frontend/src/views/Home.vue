<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import WorksSection from '../components/WorksSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import LampBg from '../components/LampBg.vue'
import { injectLanyardStyles, removeLanyardStyles, hasLanyardStyles } from '../utils/lanyardStyles'
import { useAnimationSystem } from '../composables/useAnimationSystem'

const LanyardWrapper = defineAsyncComponent(() => import('../components/LanyardWrapper.vue'))

const lanyardVisible = ref(false)

// Initialize GSAP-based animation system
useAnimationSystem()

const handleToggleLanyard = () => {
  if (hasLanyardStyles()) {
    lanyardVisible.value = false
    removeLanyardStyles()
  } else {
    injectLanyardStyles()
    lanyardVisible.value = true
  }
}
</script>

<template>
  <div class="app-container">
    <LampBg :delay="0.3" :duration="1.2" class="lamp-home" />
    <Suspense v-if="lanyardVisible">
      <LanyardWrapper
        :position="[0, 4, 15]"
        :gravity="[0, -40, 0]"
        :fov="20"
        front-image="/images/lanyard-front.png"
        back-image="/images/lanyard-back.png"
        image-fit="contain"
      />
      <template #fallback>
        <div class="lanyard-loading">加载3D场景中...</div>
      </template>
    </Suspense>
    <NavBar @toggle-lanyard="handleToggleLanyard" />
    <main>
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  position: relative;
  background: transparent;
}

main {
  position: relative;
  z-index: 1;
}

.lanyard-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 12px 24px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  pointer-events: none;
}
</style>
