<script setup lang="ts">
import { skillsData } from '../data/mock'
import { useReveal } from '../composables/useReveal'
import { Shield, Laptop, RefreshCcw, Bot, Cloud } from 'lucide-vue-next'

useReveal()

const topSkills = skillsData.slice(0, 2)
const bottomSkills = skillsData.slice(2, 5)

const iconMap: Record<string, any> = {
  Shield,
  Laptop,
  RefreshCcw,
  Bot,
  Cloud
}
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <div class="section-header">
        <div class="section-label gsap-section-label">个人优势</div>
        <h2 class="section-title gsap-section-title">EXPERTISE</h2>
        <p class="section-desc gsap-section-desc">多年积累的技术能力，为您的项目保驾护航</p>
      </div>

      <div class="skills-grid">
        <div class="top-row">
          <div
            v-for="(skill, index) in topSkills"
            :key="skill.id"
            class="skill-card large-card gsap-card"
          >
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
              <component :is="iconMap[skill.icon]" class="skill-icon" />
            </div>
            <div class="solu_title">
              <h3 class="skill-title">{{ skill.title }}</h3>
            </div>
            <div class="solu_description">
              <p class="skill-desc">{{ skill.description }}</p>
              <button class="skill-btn">了解更多</button>
            </div>
          </div>
        </div>

        <div class="bottom-row">
          <div
            v-for="(skill, index) in bottomSkills"
            :key="skill.id"
            class="skill-card small-card gsap-card"
          >
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
              <component :is="iconMap[skill.icon]" class="skill-icon" />
            </div>
            <div class="solu_title">
              <h3 class="skill-title">{{ skill.title }}</h3>
            </div>
            <div class="solu_description">
              <p class="skill-desc">{{ skill.description }}</p>
              <button class="skill-btn">了解更多</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
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

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.top-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.bottom-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.skill-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  box-shadow:
    0 2px 4px 0 rgba(136, 144, 195, 0.2),
    0 5px 15px 0 rgba(37, 44, 97, 0.15);
  border-radius: 15px;
  padding: 10px 15px;
  min-height: 265px;
  transition: 0.7s;
  cursor: pointer;
}

.skill-card::before {
  content: "";
  position: absolute;
  background: rgb(139 92 246 / 8%);
  width: 170px;
  height: 400px;
  z-index: 0;
  transform: rotate(42deg);
  right: -56px;
  top: -23px;
  border-radius: 35px;
}

.skill-card:hover {
  background: var(--color-accent);
  color: #fff;
  transform: scale(1.1);
  z-index: 9;
}

.skill-card:hover::before {
  background: rgb(255 255 255 / 12%);
}

.skill-card > .so_top_icon,
.skill-card > .solu_title,
.skill-card > .solu_description {
  position: relative;
  z-index: 1;
}

.skill-card:hover .skill-title,
.skill-card:hover .skill-desc {
  color: #fff;
}

.skill-card:hover .skill-icon {
  color: var(--color-accent);
}

.skill-card:hover .skill-btn {
  background: #fff !important;
  color: var(--color-accent);
}

.hover_color_bubble {
  position: absolute;
  background: rgb(139 92 246 / 12%);
  width: 100rem;
  height: 100rem;
  left: 0;
  right: 0;
  z-index: 0;
  top: 16rem;
  border-radius: 50%;
  transform: rotate(-36deg);
  left: -18rem;
  transition: 0.7s;
}

.skill-card:hover .hover_color_bubble {
  top: 0rem;
  background: rgb(255 255 255 / 8%);
}

.so_top_icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: 0.7s;
}

.skill-icon {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
  transition: color 0.7s;
}

.solu_title {
  margin-top: 13px;
  margin-bottom: 13px;
}

.skill-title {
  color: #212121;
  font-size: 1.3rem;
  font-family: var(--font-family);
  font-weight: 700;
  margin: 0;
}

.skill-desc {
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 15px;
}

.skill-btn {
  border: 0;
  border-radius: 15px;
  background: linear-gradient(
    140deg,
    #42c3ca 0%,
    #42c3ca 50%,
    #42c3cac7 75%
  ) !important;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  padding: 5px 16px;
  cursor: pointer;
  transition: 0.3s;
}

@media (max-width: 1200px) {
  .container {
    padding: 0 2rem;
  }
}

@media (max-width: 992px) {
  .top-row {
    grid-template-columns: 1fr;
  }

  .bottom-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 6rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .bottom-row {
    grid-template-columns: 1fr;
  }

  .skill-card {
    min-height: 240px;
    padding: 1rem;
  }

  .skill-title {
    font-size: 1.15rem;
  }

  .skill-desc {
    font-size: 14px;
  }
}
</style>
