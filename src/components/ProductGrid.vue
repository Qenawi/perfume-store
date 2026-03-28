<template>
  <div class="product-grid">
    <ProductCard
      v-for="(product, i) in products"
      :key="product.id"
      :product="product"
      :index="i"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
})
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
