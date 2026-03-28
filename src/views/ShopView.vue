<template>
  <div class="shop container">
    <div class="shop-header">
      <h1 class="shop-title">{{ config.shop.title }}</h1>
      <p class="shop-subtitle">{{ config.shop.subtitle }}</p>
    </div>

    <CategoryFilter :selected="selectedCategory" @select="onCategoryChange" />

    <div v-if="loading" class="loading-state">Loading...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else-if="products.length === 0" class="empty-state">{{ config.shop.emptyText }}</div>
    <ProductGrid v-else :products="products" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductGrid from '../components/ProductGrid.vue'
import config from '../config/site'
import { useProducts } from '../composables/useProducts'

const selectedCategory = ref('all')
const { products, loading, error, fetchProducts, fetchByCategory } = useProducts()

async function onCategoryChange(category) {
  selectedCategory.value = category
  if (category === 'all') {
    await fetchProducts()
  } else {
    await fetchByCategory(category)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.shop {
  padding-top: 110px;
  padding-bottom: 60px;
  min-height: 80vh;
}

.shop-header {
  text-align: center;
  margin-bottom: 40px;
}

.shop-title {
  font-size: 2.5rem;
  color: var(--color-text-primary);
  margin-bottom: 10px;
}

.shop-subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
  font-weight: 300;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
}

.error-state {
  color: #e74c3c;
}
</style>
