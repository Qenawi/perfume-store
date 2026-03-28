<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img :src="item.imageUrl" :alt="item.name" />
    </div>
    <div class="cart-item-info">
      <h4 class="cart-item-name">{{ item.name }}</h4>
      <span class="cart-item-brand">{{ item.brand }}</span>
      <div class="cart-item-variant">
        <span v-if="item.size" class="variant-tag">{{ item.size }}</span>
        <span v-if="item.color" class="variant-tag">
          <span class="variant-dot" :style="{ backgroundColor: getColorHex(item.color) }"></span>
          {{ item.color }}
        </span>
      </div>
      <p class="cart-item-price">{{ item.price }} {{ config.currency }}</p>
      <div class="cart-item-controls">
        <button class="qty-btn" @click="updateQuantity(item.cartKey, item.quantity - 1)">-</button>
        <span class="qty-value">{{ item.quantity }}</span>
        <button class="qty-btn" @click="updateQuantity(item.cartKey, item.quantity + 1)">+</button>
        <button class="remove-btn" @click="removeFromCart(item.cartKey)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart'
import config from '../config/site'

defineProps({
  item: { type: Object, required: true },
})

const { updateQuantity, removeFromCart } = useCart()

const colorMap = {
  'Classic Black': '#1a1a1a',
  'Dark Amber': '#8B4513',
  'Rose Pink': '#C4758B',
  'Crystal Clear': '#E8E0D4',
  'Burgundy': '#722F37',
  'Smoke Black': '#2C2C2C',
  'Amber Gold': '#FFBF00',
  'Forest Green': '#2D4A3E',
  'Matte Black': '#1C1C1C',
  'Ivory White': '#FFFFF0',
  'Soft Lilac': '#C8A2C8',
  'Sandstone': '#C2B280',
  'Warm White': '#F5F0E8',
  'Blush Pink': '#DE9E9E',
  'Pearl White': '#F0EAD6',
  'Mauve': '#E0B0FF',
  'Charcoal': '#36454F',
  'Deep Brown': '#3E2723',
}

function getColorHex(name) {
  return colorMap[name] || '#888'
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}

.cart-item-image {
  width: 70px;
  height: 90px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  font-size: 0.9rem;
  font-family: var(--font-heading);
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.cart-item-brand {
  font-size: 0.65rem;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.cart-item-variant {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.variant-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.6rem;
  color: var(--color-text-muted);
  background: var(--color-bg-secondary);
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.variant-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid var(--color-border);
}

.cart-item-price {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin: 6px 0;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 26px;
  height: 26px;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition-fast);
}

.qty-btn:hover {
  border-color: var(--color-gold);
}

.qty-value {
  font-size: 0.85rem;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  margin-left: auto;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  background: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color var(--transition-fast);
}

.remove-btn:hover {
  color: #e74c3c;
}
</style>
