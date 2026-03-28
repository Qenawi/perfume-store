<template>
  <div class="product-page container">
    <div v-if="loading" class="loading-state">Loading...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else-if="product" class="product-detail">
      <div class="product-image">
        <img :src="product.imageUrl" :alt="product.name" />
      </div>
      <div class="product-info">
        <span class="product-brand">{{ product.brand }}</span>
        <h1 class="product-name">{{ product.name }}</h1>
        <span class="product-category">{{ product.category }}</span>

        <!-- Bottle Size -->
        <div v-if="product.sizes?.length" class="option-group">
          <h4 class="option-label">{{ config.product.sizeLabel }}</h4>
          <div class="size-options">
            <button
              v-for="s in product.sizes"
              :key="s.label"
              class="size-option"
              :class="{ active: selectedSize === s.label }"
              @click="selectedSize = s.label"
            >
              <span class="size-label">{{ s.label }}</span>
              <span class="size-price">{{ s.price }} {{ config.currency }}</span>
            </button>
          </div>
        </div>

        <!-- Bottle Color -->
        <div v-if="product.colors?.length" class="option-group">
          <h4 class="option-label">{{ config.product.colorLabel }} — <span class="selected-color-name">{{ selectedColor }}</span></h4>
          <div class="color-options">
            <button
              v-for="c in product.colors"
              :key="c.hex"
              class="color-option"
              :class="{ active: selectedColor === c.name }"
              :style="{ backgroundColor: c.hex }"
              :title="c.name"
              @click="selectedColor = c.name"
            ></button>
          </div>
        </div>

        <p class="product-price">{{ currentPrice }} {{ config.currency }}</p>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-actions">
          <button class="btn btn-primary" @click="handleAdd">
            {{ config.product.addToCart }}
          </button>
          <router-link to="/shop" class="btn btn-outline">
            {{ config.product.backToShop }}
          </router-link>
        </div>
        <p v-if="!product.inStock" class="out-of-stock">{{ config.product.outOfStock }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'
import config from '../config/site'

const route = useRoute()
const { product, loading, error, fetchProductById } = useProducts()
const { addToCart } = useCart()

const selectedSize = ref(null)
const selectedColor = ref(null)

function initSelections() {
  if (product.value) {
    selectedSize.value = product.value.sizes?.[0]?.label || null
    selectedColor.value = product.value.colors?.[0]?.name || null
  }
}

const currentPrice = computed(() => {
  if (!product.value) return 0
  const sizeObj = product.value.sizes?.find((s) => s.label === selectedSize.value)
  return sizeObj ? sizeObj.price : product.value.price
})

function handleAdd() {
  addToCart(product.value, selectedSize.value, selectedColor.value)
}

onMounted(async () => {
  await fetchProductById(route.params.id)
  initSelections()
})

watch(() => route.params.id, async (newId) => {
  if (newId) {
    await fetchProductById(newId)
    initSelections()
  }
})
</script>

<style scoped>
.product-page {
  padding-top: 110px;
  padding-bottom: 60px;
  min-height: 80vh;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.product-image {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-brand {
  font-size: 0.75rem;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 2.5px;
}

.product-name {
  font-size: 2.2rem;
  color: var(--color-text-primary);
  margin: 8px 0 6px;
}

.product-category {
  display: inline-block;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
}

/* Option groups (size & color) */
.option-group {
  margin-top: 24px;
}

.option-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}

.selected-color-name {
  color: var(--color-gold);
  text-transform: none;
}

/* Size options */
.size-options {
  display: flex;
  gap: 10px;
}

.size-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 18px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.size-option:hover {
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.size-option.active {
  border-color: var(--color-gold);
  background: rgba(201, 169, 110, 0.1);
  color: var(--color-gold);
}

.size-label {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.size-price {
  font-size: 0.7rem;
  opacity: 0.7;
}

/* Color options */
.color-options {
  display: flex;
  gap: 10px;
}

.color-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  padding: 0;
  transition: all var(--transition-fast);
}

.color-option:hover {
  border-color: var(--color-text-secondary);
  transform: scale(1.1);
}

.color-option.active {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px var(--color-bg-primary), 0 0 0 5px var(--color-gold);
  transform: scale(1.1);
}

.product-price {
  font-size: 1.8rem;
  font-family: var(--font-heading);
  color: var(--color-gold);
  margin: 24px 0;
}

.product-description {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 32px;
}

.product-actions {
  display: flex;
  gap: 16px;
}

.product-actions .btn {
  text-decoration: none;
}

.out-of-stock {
  margin-top: 16px;
  color: #e74c3c;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 100px 0;
  color: var(--color-text-muted);
}

.error-state {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .product-name {
    font-size: 1.6rem;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style>
