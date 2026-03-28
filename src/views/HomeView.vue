<template>
  <div class="home">
    <HeroBanner />

    <section class="featured-section container">
      <h2 class="section-title">{{ config.home.featuredTitle }}</h2>
      <p class="section-subtitle">{{ config.home.featuredSubtitle }}</p>

      <div v-if="loading" class="loading-state">Loading...</div>
      <div v-else-if="error" class="error-state">{{ error }}</div>
      <ProductGrid v-else :products="products" />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroBanner from '../components/HeroBanner.vue'
import ProductGrid from '../components/ProductGrid.vue'
import { useProducts } from '../composables/useProducts'
import config from '../config/site'

const { products, loading, error, fetchFeatured } = useProducts()

onMounted(() => {
  fetchFeatured()
})
</script>

<style scoped>
.featured-section {
  padding: 80px 20px;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: var(--color-text-primary);
  margin-bottom: 10px;
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 48px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
}

.error-state {
  color: #e74c3c;
}
</style>
