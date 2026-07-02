<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'toggle-lanyard'): void
}>()

const isScrolled = ref(false)
const navItems = [
  { label: '工作经历', href: '#about' },
  { label: '精选作品', href: '#works' },
  { label: '个人优势', href: '#skills' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleToggleLanyard = () => {
  emit('toggle-lanyard')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-pill">
      <div class="navbar-brand">
        <div class="brand-badge">
          <div class="spiderverse-button">
            <span class="glitch-text">
              RickQ
              <span class="glitch-layers">
                <span class="glitch-layer layer-1">RickQ</span>
                <span class="glitch-layer layer-2">RickQ</span>
              </span>
            </span>
          </div>
          <div class="noise"></div>
          <div class="glitch-slice"></div>
        </div>
      </div>

      <ul class="navbar-nav">
        <li v-for="item in navItems" :key="item.label">
          <a href="javascript:void(0)" @click="scrollToSection(item.href)" class="nav-link">
            {{ item.label }}
          </a>
        </li>
      </ul>

      <div class="nav-buttons">
        <button @click="handleToggleLanyard" class="lanyard-btn">
          <span class="dots_border"></span>
          <span class="text_button">Lanyard</span>
        </button>
        <button @click="scrollToSection('#contact')" class="contact-btn">
          联系我
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: center;
  transition: padding var(--transition-base);
}

.navbar-scrolled {
  padding: 0.875rem 2rem;
}

.nav-pill {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-base);
}

.navbar-scrolled .nav-pill {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}

/* Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.brand-badge {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.2s ease;
}

.brand-badge:hover {
  transform: scale(1.02);
}

.spiderverse-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.2;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  background: #fff;
  color: #6d28d9;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transform-style: preserve-3d;
  transition: all 0.15s ease;
  font-family: Arial, sans-serif;
}

.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-layers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-layer {
  position: absolute;
  content: "RickQ";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 9999px;
  opacity: 0;
  transition: all 0.15s ease;
}

.layer-1 {
  color: #0ff;
  transform-origin: center;
}

.layer-2 {
  color: #f0f;
  transform-origin: center;
}

.brand-badge:hover .layer-1 {
  opacity: 1;
  animation: glitchLayer1 0.4s steps(2) infinite;
}

.brand-badge:hover .layer-2 {
  opacity: 1;
  animation: glitchLayer2 0.4s steps(2) infinite;
}

.brand-badge:hover .spiderverse-button {
  animation: buttonGlitch 0.3s steps(2) infinite;
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.5),
    0 0 30px rgba(0, 255, 255, 0.5),
    0 0 40px rgba(255, 0, 255, 0.5);
}

.noise {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-radial-gradient(
    circle at 50% 50%,
    transparent 0,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 2px
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  animation: noise 0.2s steps(2) infinite;
}

.brand-badge:hover .noise {
  opacity: 1;
}

@keyframes buttonGlitch {
  0% {
    transform: translate(0) scale(1.1);
  }
  25% {
    transform: translate(-10px, 5px) scale(1.15) skew(-5deg);
  }
  50% {
    transform: translate(10px, -5px) scale(1.1) skew(5deg);
  }
  75% {
    transform: translate(-15px, -5px) scale(1.05) skew(-3deg);
  }
  100% {
    transform: translate(0) scale(1.1);
  }
}

@keyframes glitchLayer1 {
  0% {
    transform: translate(-20px, -10px) scale(1.1) skew(-10deg);
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
  }
  25% {
    transform: translate(20px, 10px) scale(1.2) skew(10deg);
    clip-path: polygon(0 30%, 100% 30%, 100% 60%, 0 60%);
  }
  50% {
    transform: translate(-15px, 5px) scale(0.9) skew(-5deg);
    clip-path: polygon(0 10%, 100% 10%, 100% 40%, 0 40%);
  }
  75% {
    transform: translate(15px, -5px) scale(1.3) skew(5deg);
    clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%);
  }
  100% {
    transform: translate(-20px, -10px) scale(1.1) skew(-10deg);
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
  }
}

@keyframes glitchLayer2 {
  0% {
    transform: translate(20px, 10px) scale(1.1) skew(10deg);
    clip-path: polygon(0 50%, 100% 50%, 100% 80%, 0 80%);
  }
  25% {
    transform: translate(-20px, -10px) scale(1.2) skew(-10deg);
    clip-path: polygon(0 60%, 100% 60%, 100% 90%, 0 90%);
  }
  50% {
    transform: translate(15px, -5px) scale(0.9) skew(5deg);
    clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%);
  }
  75% {
    transform: translate(-15px, 5px) scale(1.3) skew(-5deg);
    clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
  }
  100% {
    transform: translate(20px, 10px) scale(1.1) skew(10deg);
    clip-path: polygon(0 50%, 100% 50%, 100% 80%, 0 80%);
  }
}

@keyframes noise {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -5%);
  }
  20% {
    transform: translate(10%, 5%);
  }
  30% {
    transform: translate(-5%, 10%);
  }
  40% {
    transform: translate(15%, -5%);
  }
  50% {
    transform: translate(-10%, 15%);
  }
  60% {
    transform: translate(5%, -10%);
  }
  70% {
    transform: translate(-15%, 5%);
  }
  80% {
    transform: translate(10%, 10%);
  }
  90% {
    transform: translate(-5%, 15%);
  }
  100% {
    transform: translate(0, 0);
  }
}

.glitch-slice {
  position: absolute;
  width: 120%;
  height: 5px;
  background: #fff;
  opacity: 0;
  animation: slice 3s linear infinite;
}

@keyframes slice {
  0% {
    top: -10%;
    opacity: 0;
  }
  1% {
    opacity: 0.5;
  }
  3% {
    opacity: 0;
  }
  50% {
    top: 110%;
  }
  100% {
    top: 110%;
  }
}

/* Navigation Links */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-family);
  font-size: 17px;
  background: transparent;
  border: none;
  padding: 0.5em 1em;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  position: relative;
  transition: 0.5s ease;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #8b5cf6;
  transition: 0.5s ease;
}

.nav-link:hover {
  color: #000000;
  transition-delay: 0.5s;
}

.nav-link:hover::before {
  width: 100%;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  background-color: #8b5cf6;
  transition: 0.4s ease;
  z-index: -1;
}

.nav-link:hover::after {
  height: 100%;
  transition-delay: 0.4s;
}

/* Nav Buttons Container */
.nav-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Lanyard Button - uiverse.io style */
.lanyard-btn {
  --black-700: hsla(0 0% 12% / 1);
  --border_radius: 9999px;
  --transtion: 0.3s ease-in-out;
  --offset: 2px;

  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  transform-origin: center;

  padding: 0.75rem 1.5rem;
  background-color: transparent;

  border: none;
  border-radius: var(--border_radius);
  transform: scale(calc(1 + (var(--active, 0) * 0.1)));

  transition: transform var(--transtion);
  flex-shrink: 0;
  white-space: nowrap;
}

.lanyard-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  background-color: var(--black-700);

  border-radius: var(--border_radius);
  box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%),
    0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active, 0))),
    0 0 0 calc(var(--active, 0) * 0.375rem) hsl(260 97% 50% / 0.75);

  transition: all var(--transtion);
  z-index: 0;
}

.lanyard-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  background-color: hsla(260 97% 61% / 0.75);
  background-image: radial-gradient(
      at 51% 89%,
      hsla(266, 45%, 74%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 100% 100%, hsla(266, 36%, 60%, 1) 0px, transparent 50%),
    radial-gradient(at 22% 91%, hsla(266, 36%, 60%, 1) 0px, transparent 50%);
  background-position: top;

  opacity: var(--active, 0);
  border-radius: var(--border_radius);
  transition: opacity var(--transtion);
  z-index: 2;
}

.lanyard-btn:is(:hover, :focus-visible) {
  --active: 1;
}

.lanyard-btn:active {
  transform: scale(1);
}

.lanyard-btn .dots_border {
  --size_border: calc(100% + 2px);

  overflow: hidden;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: var(--size_border);
  height: var(--size_border);
  background-color: transparent;

  border-radius: var(--border_radius);
  z-index: -10;
}

.lanyard-btn .dots_border::before {
  content: "";
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left;
  transform: rotate(0deg);

  width: 100%;
  height: 2rem;
  background-color: white;

  mask: linear-gradient(transparent 0%, white 120%);
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.lanyard-btn .text_button {
  position: relative;
  z-index: 10;

  background-image: linear-gradient(
    90deg,
    hsla(0 0% 100% / 1) 0%,
    hsla(0 0% 100% / var(--active, 0)) 120%
  );
  background-clip: text;
  -webkit-background-clip: text;

  font-size: 0.875rem;
  font-weight: 500;
  color: transparent;
  font-family: var(--font-family);
  letter-spacing: 0.02em;
}

/* Contact Button - uiverse.io style */
.contact-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  border: 0;
  background-color: #000000;
  color: #ffffff;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.875rem;
  transition: all 0.5s ease;
  flex-shrink: 0;
  white-space: nowrap;
  font-family: var(--font-family);
  font-weight: 500;
}

.contact-btn:hover {
  letter-spacing: 0.04em;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 7px 29px 0px;
}

.contact-btn:active {
  letter-spacing: 0.04em;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 0.875rem 1rem;
  }

  .nav-pill {
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  .navbar-nav {
    gap: 1.25rem;
  }

  .nav-link {
    font-size: 0.8rem;
  }

  .contact-btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    letter-spacing: 0.015em;
  }

  .brand-name {
    font-size: 0.875rem;
  }
}
</style>
