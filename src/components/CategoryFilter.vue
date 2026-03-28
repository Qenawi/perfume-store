<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat.value"
      class="filter-btn"
      :class="{ active: selected === cat.value }"
      @click="$emit('select', cat.value)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup>
import config from '../config/site'

defineProps({
  selected: { type: String, default: 'all' },
})

defineEmits(['select'])

const categories = config.shop.categories
</script>

<style scoped>
.category-filter {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.filter-btn {
  padding: 10px 28px;
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 30px;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.filter-btn.active {
  background: var(--color-gold);
  color: var(--color-bg-primary);
  border-color: var(--color-gold);
}
</style>
