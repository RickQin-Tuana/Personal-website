<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { worksData, type Work } from '../data/mock'
import { fetchWorks } from '../api'
import { refreshSectionAnimations } from '../composables/useAnimationSystem'

const works = ref<Work[]>([])
const isLoading = ref(true)
const activeId = ref<number | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const previewX = ref(0)
const previewY = ref(0)

const activeWork = computed(() => works.value.find((w) => w.id === activeId.value))

onMounted(async () => {
  try {
    const apiWorks = await fetchWorks()
    if (apiWorks && apiWorks.length > 0) {
      works.value = apiWorks
    } else {
      works.value = worksData
    }
  } catch (error) {
    // 后端不可用或接口异常时，降级使用本地 mock 数据，避免一直 loading
    console.warn('Failed to fetch works from API, falling back to mock data:', error)
    works.value = worksData
  } finally {
    isLoading.value = false
  }

  await nextTick()

  // Re-register GSAP scroll animations now that dynamic rows exist in the DOM
  refreshSectionAnimations()
})

const handleMouseEnter = (id: number, e: MouseEvent) => {
  activeId.value = id
  updatePreviewPosition(e)
}

const handleMouseMove = (e: MouseEvent) => {
  updatePreviewPosition(e)
}

const handleMouseLeave = () => {
  activeId.value = null
}

const updatePreviewPosition = (e: MouseEvent) => {
  // Use viewport coordinates so the preview can break out of any
  // ancestor container / overflow clipping.
  previewX.value = e.clientX
  previewY.value = e.clientY
}
</script>

<template>
  <section id="works" ref="sectionRef" class="works-section">
    <div class="container">
      <div class="section-header">
        <div class="section-label gsap-section-label">精选作品</div>
        <h2 class="section-title gsap-section-title">PORTFOLIO</h2>
        <p class="section-desc gsap-section-desc">探索我参与的精彩项目，每一个都是用心之作</p>
      </div>

      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
      </div>

      <div v-else class="works-list">
        <div
          v-for="(work, index) in works"
          :key="work.id"
          class="work-row gsap-card"
          :class="{ 'is-active': activeId === work.id }"
          @mouseenter="handleMouseEnter(work.id, $event)"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
        >
          <div class="work-num">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="work-info">
            <h3 class="work-title">{{ work.title }}</h3>
            <p class="work-subtitle">+ {{ work.type }} +</p>
          </div>
          <div class="work-date">{{ work.date }}</div>
        </div>
      </div>

      <!-- Render preview at body level so it is not clipped by any container -->
      <Teleport to="body">
        <div
          v-if="activeId !== null && activeWork"
          class="work-preview is-active"
          :style="{ left: previewX + 'px', top: previewY + 'px' }"
        >
          <img :src="activeWork.cover" :alt="activeWork.title" class="work-preview-img" />
        </div>
      </Teleport>
    </div>
  </section>
</template>

<style scoped>
.works-section {
  padding: var(--section-gap) 0;
  background: transparent;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section-header {
  margin-bottom: 5rem;
}

.section-label {
  font-family: var(--font-family);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.section-title {
  font-family: var(--font-family);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin: 0;
}

.section-desc {
  font-family: var(--font-family);
  font-size: 1.0625rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 1.5rem 0 0;
  max-width: 500px;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 4rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.works-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.work-row {
  --px: 50%;
  --py: 50%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-sizing: border-box;
  width: 100%;
  min-height: 10rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  z-index: 0;
}

.works-list .work-row:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.work-row::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
  transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.work-row:hover::after,
.work-row.is-active::after {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.work-num,
.work-info,
.work-date {
  position: relative;
  z-index: 1;
}

.work-num {
  font-family: var(--font-family);
  font-size: clamp(4rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px var(--color-text);
  letter-spacing: 0.05em;
  transition:
    color 0.4s ease,
    -webkit-text-stroke-color 0.4s ease;
  flex-shrink: 0;
  width: 7rem;
}

.work-row:hover .work-num,
.work-row.is-active .work-num {
  color: var(--color-accent);
  -webkit-text-stroke-color: var(--color-accent);
}

.work-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.work-title {
  font-family: var(--font-family);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  text-transform: uppercase;
  transition: color 0.4s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.work-subtitle {
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  transition: color 0.4s ease;
}

.work-row:hover .work-title,
.work-row:hover .work-subtitle,
.work-row.is-active .work-title,
.work-row.is-active .work-subtitle {
  color: #000;
}

.work-date {
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  margin-left: auto;
  transition: color 0.4s ease;
  flex-shrink: 0;
}

.work-row:hover .work-date,
.work-row.is-active .work-date {
  color: #000;
}

.work-preview {
  position: fixed;
  left: 0;
  top: 0;
  width: 26rem;
  height: 16rem;
  border-radius: 1rem;
  overflow: hidden;
  pointer-events: none;
  z-index: 9999;
  border: 3px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 35px 80px rgba(0, 0, 0, 0.5),
    0 15px 35px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%) scale(0) perspective(1000px) rotateY(-22deg) rotateX(10deg) rotateZ(8deg);
  opacity: 0;
  /* Hide immediately when leaving the row */
  transition:
    transform 0.15s ease,
    opacity 0.1s ease;
}

.work-preview.is-active {
  transform: translate(-50%, -50%) scale(1) perspective(1000px) rotateY(-12deg) rotateX(5deg) rotateZ(3deg);
  opacity: 1;
  /* Smooth entrance when hovering */
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.35s ease;
}

.work-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 992px) {
  .work-row {
    gap: 1.25rem;
    min-height: 8rem;
    padding: 1.5rem 0;
  }

  .work-num {
    width: 5rem;
    -webkit-text-stroke-width: 1.5px;
  }

  .work-preview {
    width: 20rem;
    height: 12rem;
  }
}

@media (max-width: 768px) {
  .works-section {
    padding: 6rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .work-row {
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    min-height: auto;
    padding: 1.25rem 0;
  }

  .work-num {
    width: auto;
    font-size: 2.5rem;
    -webkit-text-stroke-width: 1px;
  }

  .work-info {
    flex: 1;
    min-width: 60%;
  }

  .work-title {
    white-space: normal;
  }

  .work-date {
    width: 100%;
    margin-left: 0;
    text-align: left;
    order: 4;
  }

  .work-preview {
    display: none;
  }
}
</style>
