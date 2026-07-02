<script setup lang="ts">
import { ref } from 'vue'
import { personalInfo, experienceData } from '../data/mock'
import { useReveal } from '../composables/useReveal'
useReveal()

function formatDesc(text: string) {
  return text.split('\n')
}

/* 3D Card */
const cardRef = ref<HTMLElement>()
const rotateX = ref(0)
const rotateY = ref(0)
const glareX = ref(50)
const glareY = ref(50)
const isHovering = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  const el = cardRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const maxRotate = parseFloat(getComputedStyle(el).getPropertyValue('--avatar-rotate-max')) || 10
  rotateY.value = ((x - centerX) / centerX) * maxRotate
  rotateX.value = ((centerY - y) / centerY) * maxRotate
  glareX.value = (x / rect.width) * 100
  glareY.value = (y / rect.height) * 100
  isHovering.value = true
}

const handleMouseLeave = () => {
  rotateX.value = 0
  rotateY.value = 0
  glareX.value = 50
  glareY.value = 50
  isHovering.value = false
}
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <!-- ========== ABOUT ME ========== -->
      <div class="about-me-wrapper">
        <!-- Left: Avatar -->
        <div class="about-avatar gsap-reveal">
          <div
            ref="cardRef"
            class="avatar-card-3d gsap-reveal-inner"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <div
              class="avatar-card-body"
              :class="{ 'is-hovering': isHovering }"
              :style="{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
              }"
            >
              <div
                class="avatar-card-glare"
                :style="{
                  background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, transparent 55%)`
                }"
              ></div>
              <div class="avatar-card-content">
                <img :src="personalInfo.avatar" alt="头像" class="avatar" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="about-info">
          <div class="info-label gsap-section-label">ABOUT ME</div>
          <h2 class="info-greeting gsap-section-title">{{ personalInfo.greeting }}</h2>
          <p class="info-bio gsap-section-desc">{{ personalInfo.bio }}</p>

          <div class="info-grid gsap-card">
            <div class="info-col gsap-stagger-item">
              <span class="info-col-label">当前身份</span>
              <span class="info-col-value">{{ personalInfo.identity }}</span>
            </div>
            <div class="info-col gsap-stagger-item">
              <span class="info-col-label">服务方向</span>
              <span class="info-col-value">{{ personalInfo.direction }}</span>
            </div>
            <div class="info-col gsap-stagger-item">
              <span class="info-col-label">手机</span>
              <span class="info-col-value">{{ personalInfo.phone }}</span>
            </div>
            <div class="info-col gsap-stagger-item">
              <span class="info-col-label">邮箱</span>
              <span class="info-col-value">{{ personalInfo.email }}</span>
            </div>
          </div>

          <div class="stats-row gsap-card">
            <div v-for="stat in personalInfo.stats" :key="stat.label" class="stat-item gsap-stagger-item">
              <span class="stat-number">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="building-row gsap-card">
            <div class="building-left">
              <span class="building-label gsap-section-label">NOW BUILDING</span>
              <div class="building-tags">
                <span v-for="tag in personalInfo.buildingTags" :key="tag" class="build-tag gsap-stagger-item">{{ tag }}</span>
              </div>
            </div>
            <span class="building-right">项目标签</span>
          </div>
        </div>
      </div>

      <!-- ========== CAREER PATH ========== -->
      <div class="career-wrapper">
        <div class="career-header">
          <span class="career-label-en gsap-section-title">CAREER PATH</span>
          <span class="career-label-cn gsap-section-label">工作经历</span>
        </div>

        <!-- Timeline -->
        <div class="timeline-wrapper gsap-reveal">
          <div class="timeline-line gsap-reveal-inner"></div>
          <div class="timeline-nodes">
            <div v-for="(exp, i) in experienceData" :key="exp.id" class="timeline-node gsap-stagger-item">
              <svg class="node-star" :class="{ 'node-active': i === 0 }" viewBox="0 0 24 24" fill="none">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Experience Cards -->
        <div class="experience-grid">
          <div
            v-for="(exp, i) in experienceData"
            :key="exp.id"
            class="experience-card gsap-card"
          >
            <div class="card-period">{{ exp.period }}</div>
            <h3 class="card-company">{{ exp.company }}</h3>
            <div class="card-role">{{ exp.role }}</div>
            <div class="card-desc">
              <p v-for="(line, idx) in formatDesc(exp.description)" :key="idx">{{ line }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  --avatar-rotate-max: 10;
  padding: var(--section-gap) 0;
  background: transparent;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* ========== ABOUT ME ========== */
.about-me-wrapper {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 4rem;
  margin-bottom: 8rem;
}

/* Avatar */
.about-avatar {
  display: flex;
  align-items: flex-start;
  min-width: 0;
  overflow: visible;
}

.avatar-card-3d {
  width: 100%;
  max-width: 100%;
  perspective: 1000px;
  transform-style: preserve-3d;
  box-sizing: border-box;
  overflow: visible;
  padding: 1rem;
}

.avatar-card-body {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--radius-lg);
  overflow: visible;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.avatar-card-body.is-hovering {
  box-shadow:
    0 35px 60px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.25);
}

.avatar-card-content {
  width: 100%;
  height: 100%;
  transform: translateZ(24px) scale(0.98);
  transform-style: preserve-3d;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
}

.avatar-card-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.25s ease;
  mix-blend-mode: overlay;
}

.avatar-card-body.is-hovering .avatar-card-glare {
  opacity: 1;
}

/* Info */
.about-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 0.5rem;
}

.info-label {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  text-transform: uppercase;
}

.info-greeting {
  font-family: var(--font-family);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  line-height: 1.1;
}

.info-bio {
  font-family: var(--font-family);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 520px;
  white-space: pre-line;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 2.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.info-col-label {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.info-col-value {
  font-family: var(--font-family);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}

/* Stats Row */
.stats-row {
  display: flex;
  gap: 4rem;
  padding: 0.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.stat-number {
  font-family: var(--font-family);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

/* Building Row */
.building-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 0.5rem;
}

.building-left {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.building-label {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  text-transform: uppercase;
}

.building-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.build-tag {
  font-family: var(--font-family);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  padding: 0.375rem 0.875rem;
  border-radius: 50px;
  letter-spacing: 0.02em;
}

.building-right {
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* ========== CAREER PATH ========== */
.career-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.career-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.career-label-en {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.career-label-cn {
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text);
}

/* Timeline */
.timeline-wrapper {
  position: relative;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(139, 92, 246, 0.2) 0%,
    rgba(139, 92, 246, 0.5) 50%,
    rgba(139, 92, 246, 0.2) 100%
  );
  transform: translateY(-50%);
}

.timeline-nodes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
}

.timeline-node {
  display: flex;
  justify-content: flex-start;
}

.node-star {
  width: 16px;
  height: 16px;
  color: rgba(139, 92, 246, 0.4);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.node-active {
  color: var(--color-accent);
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
}

/* Experience Grid */
.experience-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

/* Experience Card */
.experience-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-period {
  font-family: var(--font-family);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.02em;
}

.card-company {
  font-family: var(--font-family);
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  line-height: 1.3;
}

.card-role {
  display: inline-flex;
  align-self: flex-start;
  font-family: var(--font-family);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  letter-spacing: 0.02em;
}

.card-desc {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-desc p {
  font-family: var(--font-family);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .about-section {
    --avatar-rotate-max: 8;
  }

  .container {
    padding: 0 2rem;
  }

  .about-me-wrapper {
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    margin-bottom: 6rem;
  }

  .avatar-card-3d {
    padding: 0.75rem;
  }

  .experience-grid {
    gap: 2rem;
  }

  .stats-row {
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .about-section {
    --avatar-rotate-max: 6;
    padding: 6rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .about-me-wrapper {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-bottom: 5rem;
  }

  .about-avatar {
    max-width: 280px;
  }

  .avatar-card-3d {
    padding: 0.5rem;
  }

  .avatar-card-content {
    transform: translateZ(16px) scale(0.985);
  }

  .info-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .stats-row {
    gap: 2rem;
  }

  .building-row {
    flex-direction: column;
    gap: 1rem;
  }

  .timeline-wrapper {
    display: none;
  }

  .experience-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .experience-card {
    padding-left: 1.25rem;
    border-left: 1px solid rgba(139, 92, 246, 0.2);
  }
}
</style>
