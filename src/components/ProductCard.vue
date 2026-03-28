<template>
  <div class="product-card fade-in" :style="{ animationDelay: `${index * 0.1}s` }">
    <router-link :to="`/product/${product.id}`" class="card-image-link">
      <div class="card-image">
        <img :src="product.imageUrl" :alt="product.name" loading="lazy" />
      </div>
    </router-link>
    <div class="card-info">
      <span class="card-brand">{{ product.brand }}</span>
      <router-link :to="`/product/${product.id}`" class="card-name-link">
        <h3 class="card-name">{{ product.name }}</h3>
      </router-link>

      <!-- Size selector -->
      <div v-if="product.sizes?.length" class="card-sizes">
        <button
          v-for="s in product.sizes"
          :key="s.label"
          class="size-btn"
          :class="{ active: selectedSize === s.label }"
          @click="selectedSize = s.label"
        >
          {{ s.label }}
        </button>
      </div>

      <!-- Color swatches -->
      <div v-if="product.colors?.length" class="card-colors">
        <button
          v-for="c in product.colors"
          :key="c.hex"
          class="color-swatch"
          :class="{ active: selectedColor === c.name }"
          :style="{ backgroundColor: c.hex }"
          :title="c.name"
          @click="selectedColor = c.name"
        ></button>
      </div>

      <p class="card-price">{{ currentPrice }} {{ config.currency }}</p>
      <button class="btn btn-outline btn-sm" @click="handleAdd">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import config from '../config/site'

const props = defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { addToCart } = useCart()

const defaultSize = props.product.sizes?.[0]?.label || null
const defaultColor = props.product.colors?.[0]?.name || null

const selectedSize = ref(defaultSize)
const selectedColor = ref(defaultColor)

const currentPrice = computed(() => {
  const sizeObj = props.product.sizes?.find((s) => s.label === selectedSize.value)
  return sizeObj ? sizeObj.price : props.product.price
})

function handleAdd() {
  addToCart(props.product, selectedSize.value, selectedColor.value)
}
</script>

<style scoped>
.product-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-normal);
  opacity: 0;
}

.product-card:hover {
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.card-image-link {
  display: block;
  text-decoration: none;
}

.card-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.product-card:hover .card-image img {
  transform: scale(1.05);
}

.card-info {
  padding: 20px;
}

.card-brand {
  font-size: 0.7rem;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.card-name-link {
  text-decoration: none;
  color: inherit;
}

.card-name {
  font-size: 1.1rem;
  margin: 6px 0 10px;
  color: var(--color-text-primary);
}

.card-sizes {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.size-btn {
  padding: 4px 10px;
  font-size: 0.65rem;
  letter-spacing: 0.5px;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  transition: all var(--transition-fast);
}

.size-btn:hover {
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.size-btn.active {
  background: var(--color-gold);
  color: var(--color-bg-primary);
  border-color: var(--color-gold);
}

.card-colors {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  padding: 0;
  transition: border-color var(--transition-fast);
}

.color-swatch:hover {
  border-color: var(--color-text-secondary);
}

.color-swatch.active {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 2px var(--color-bg-card), 0 0 0 3px var(--color-gold);
}

.card-price {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  font-weight: 300;
}

.btn-sm {
  padding: 8px 20px;
  font-size: 0.75rem;
  width: 100%;
}
</style>
