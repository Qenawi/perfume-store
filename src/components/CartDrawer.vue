<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="cart-overlay" @click="$emit('close')"></div>
    </Transition>
    <Transition name="slide">
      <div v-if="open" class="cart-drawer">
        <div class="cart-header">
          <h2 class="cart-title">{{ config.cart.title }}</h2>
          <button class="close-btn" @click="$emit('close')">&times;</button>
        </div>

        <div v-if="cart.length === 0" class="cart-empty">
          <p>{{ config.cart.emptyText }}</p>
          <router-link to="/shop" class="btn btn-outline btn-sm" @click="$emit('close')">
            {{ config.cart.browseText }}
          </router-link>
        </div>

        <div v-else class="cart-body">
          <div class="cart-items">
            <CartItem v-for="item in cart" :key="item.cartKey" :item="item" />
          </div>
          <div class="cart-footer">
            <p class="cart-disclaimer">{{ config.cart.disclaimer }}</p>
            <div class="cart-total">
              <span>{{ config.cart.totalLabel }}</span>
              <span class="total-amount">{{ cartTotal.toFixed(2) }} {{ config.currency }}</span>
            </div>
            <div class="cart-buttons">
              <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn btn-primary btn-block whatsapp-btn" @click="onWhatsAppClick">
                {{ config.cart.whatsappText }}
              </a>
              <button class="btn btn-outline btn-block" @click="clearCart">
                {{ config.cart.clearText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import CartItem from './CartItem.vue'
import { useCart } from '../composables/useCart'
import { useTracking } from '../composables/useTracking'
import config from '../config/site'

defineProps({
  open: { type: Boolean, default: false },
})

defineEmits(['close'])

const { cart, cartTotal, clearCart } = useCart()
const { trackOrder } = useTracking()

const WHATSAPP_NUMBER = config.whatsapp.number

function onWhatsAppClick() {
  trackOrder(cart.value, cartTotal.value)
}

import { computed } from 'vue'

const whatsappMessage = computed(() => {
  let msg = `🛍️ *${config.whatsapp.orderHeader}*\n\n`
  cart.value.forEach((item, i) => {
    let details = `${i + 1}. *${item.name}* (${item.brand})`
    if (item.size) details += `\n   Size: ${item.size}`
    if (item.color) details += `\n   Color: ${item.color}`
    details += `\n   Qty: ${item.quantity} × ${item.price} ${config.currency} = ${(item.quantity * item.price).toFixed(2)} ${config.currency}\n\n`
    msg += details
  })
  msg += `──────────\n*Total: ${cartTotal.value.toFixed(2)} ${config.currency}*`
  return msg
})

const whatsappUrl = computed(() => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage.value)}`
})
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  z-index: 200;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  max-width: 90vw;
  height: 100vh;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border);
  z-index: 201;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px;
  border-bottom: 1px solid var(--color-border);
}

.cart-title {
  font-size: 1.2rem;
  color: var(--color-text-primary);
}

.close-btn {
  font-size: 1.8rem;
  background: none;
  color: var(--color-text-secondary);
  padding: 0 4px;
  line-height: 1;
  transition: color var(--transition-fast);
}

.close-btn:hover {
  color: var(--color-text-primary);
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--color-text-muted);
}

.cart-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid var(--color-border);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.total-amount {
  font-size: 1.3rem;
  font-family: var(--font-heading);
  color: var(--color-gold);
}

.cart-disclaimer {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 16px;
  padding: 10px 12px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--color-gold-dark);
}

.cart-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.whatsapp-btn {
  background-color: #25d366;
  color: #fff;
  text-decoration: none;
}

.whatsapp-btn:hover {
  background-color: #1ebe57;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  color: #fff;
}

.btn-block {
  width: 100%;
}

.btn-sm {
  padding: 8px 20px;
  font-size: 0.75rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
