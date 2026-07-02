<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CircularGallery from './CircularGallery.vue'
import GlitchText from './GlitchText.vue'

const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section id="hero" class="hero-section">
    <div
      class="hero-content"
      :style="{
        transform: `translate(${mouseX * 0.2}px, ${mouseY * 0.2}px)`
      }"
    >
      <div class="container">
        <div class="content-wrapper">
          <div class="title-group">
            <h1 class="headline-primary gsap-hero-line gsap-hero-headline">RickQin</h1>
            <div class="headline-secondary-row gsap-hero-line gsap-hero-subtitle">
              <GlitchText
                text="Portfolio"
                :speed="0.8"
                :enable-shadows="true"
                :enable-on-hover="false"
                class="headline-secondary"
              />
              <span class="signature">RickQin</span>
            </div>
            <div class="stars">
              <svg class="star star-lg gsap-hero-line gsap-hero-star" viewBox="0 0 36 36" fill="none">
                <path d="M18 0L21.5 14.5L36 18L21.5 21.5L18 36L14.5 21.5L0 18L14.5 14.5L18 0Z" fill="#8b5cf6"/>
              </svg>
              <svg class="star star-sm gsap-hero-line gsap-hero-star" viewBox="0 0 24 24" fill="none">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#3b82f6"/>
              </svg>
            </div>
          </div>

          <p class="desc-text gsap-hero-line gsap-hero-desc">网络安全工程师 / vibe coding全栈开发者</p>
          <p class="desc-text-sub gsap-hero-line gsap-hero-desc">我们不能改变过去，但我们能决定如何面对未来</p>
        </div>
      </div>
      <CircularGallery class="hero-gallery gsap-hero-line gsap-hero-gallery" />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: transparent;
}

.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 120px 0 0;
  transition: transform 0.15s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  gap: 1.5rem;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  width: 100%;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
}

.hero-gallery {
  width: 100%;
  padding: 0;
}

/* Title Group */
.title-group {
  position: relative;
  margin-bottom: 0.5rem;
}

.headline-primary {
  font-family: var(--font-family);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--color-accent);
  text-transform: uppercase;
}

.headline-secondary-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-top: 0.25rem;
}

.headline-secondary {
  font-family: var(--font-family);
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
  color: #ffffff;
  text-transform: uppercase;
}

.signature {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-style: italic;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.02em;
}

/* Stars */
.stars {
  position: absolute;
  top: -0.5rem;
  right: -3.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}

.star {
  filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.5));
}

.star-lg {
  width: 32px;
  height: 32px;
}

.star-sm {
  width: 18px;
  height: 18px;
  margin-top: 0.25rem;
  opacity: 0.8;
}

/* Description */
.desc-text {
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.desc-text-sub {
  font-family: var(--font-family);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

@media (max-width: 1200px) {
  .container {
    padding: 0 2rem;
  }

  .grid-line {
    display: none;
  }

  .stars {
    right: -2.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding-top: 80px;
  }

  .hero-content {
    padding: 40px 0 0;
    min-height: auto;
    gap: 1.25rem;
  }

  .container {
    padding: 0 1.5rem;
  }

  .content-wrapper {
    gap: 0.75rem;
  }

  .headline-primary {
    font-size: clamp(2.5rem, 10vw, 3.5rem);
  }

  .headline-secondary {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }

  .signature {
    font-size: 0.9rem;
  }

  .stars {
    right: -1.5rem;
    top: -0.25rem;
  }

  .star-lg {
    width: 24px;
    height: 24px;
  }

  .star-sm {
    width: 14px;
    height: 14px;
  }
}
</style>
