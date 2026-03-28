<template>
  <div class="app">
    <Navbar @toggle-cart="cartOpen = !cartOpen" />
    <main>
      <router-view />
    </main>
    <Footer />
    <CartDrawer :open="cartOpen" @close="cartOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'

const cartOpen = ref(false)
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
