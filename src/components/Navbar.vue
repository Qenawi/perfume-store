<template>
  <nav class="navbar">
    <div class="container navbar-inner">
      <router-link to="/" class="navbar-logo">
        <span class="logo-mark">{{ config.brand.name }}</span>
        <span class="logo-divider"></span>
        <span class="logo-label">{{ config.brand.tagline }}</span>
      </router-link>

      <div class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/shop" class="nav-link">Shop</router-link>
      </div>

      <button class="cart-btn" @click="$emit('toggleCart')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useCart } from '../composables/useCart'
import config from '../config/site'

defineEmits(['toggleCart'])
const { cartCount } = useCart()
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-mark {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gold);
  letter-spacing: 4px;
}

.logo-divider {
  width: 1px;
  height: 18px;
  background: var(--color-border-hover);
}

.logo-label {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 3px;
}

.navbar-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-gold);
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: var(--color-text-primary);
}

.nav-link.router-link-exact-active::after {
  transform: scaleX(1);
}

.cart-btn {
  position: relative;
  background: none;
  color: var(--color-text-secondary);
  padding: var(--space-sm);
  transition: color var(--transition-fast);
}

.cart-btn:hover {
  color: var(--color-gold);
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 0;
  background: var(--color-gold);
  color: var(--color-text-inverse);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-bold);
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .navbar-links {
    gap: 20px;
  }

  .nav-link {
    font-size: var(--text-xs);
  }

  .logo-divider,
  .logo-label {
    display: none;
  }
}
</style>
