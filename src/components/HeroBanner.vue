<template>
  <section class="hero">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <p class="hero-greeting">{{ greeting }}</p>
      <h1 class="hero-title">{{ config.hero.title }}</h1>
      <p class="hero-subtitle">{{ config.hero.subtitle }}</p>
      <router-link to="/shop" class="btn btn-primary hero-cta">
        {{ config.hero.ctaText }}
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import config from '../config/site'

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(201, 169, 110, 0.08) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 0%, var(--color-bg-primary) 80%);
}

.hero-content {
  position: relative;
  text-align: center;
  max-width: 700px;
}

.hero-greeting {
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: var(--space-md);
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xl);
  font-weight: var(--font-weight-light);
  line-height: 1.7;
}

.hero-cta {
  text-decoration: none;
}

@media (max-width: 768px) {
  .hero {
    min-height: 70vh;
  }

  .hero-title {
    font-size: var(--text-2xl);
  }

  .hero-subtitle {
    font-size: var(--text-base);
  }
}
</style>
