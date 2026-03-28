<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo">{{ config.brand.name }}</span>
          <p class="footer-tagline">{{ config.brand.description }}</p>
        </div>
        <div class="footer-nav">
          <h5 class="footer-heading">{{ config.footer.navHeading }}</h5>
          <router-link to="/">Home</router-link>
          <router-link to="/shop">Shop</router-link>
        </div>
        <div class="footer-contact">
          <h5 class="footer-heading">{{ config.footer.contactHeading }}</h5>
          <p>{{ config.footer.email }}</p>
          <p>{{ config.footer.contactNote }}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ year }} {{ config.footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import config from '../config/site'
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  margin-top: var(--space-3xl);
}

.footer-inner {
  padding: var(--space-xl) 0;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-xl);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.footer-logo {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gold);
  letter-spacing: 4px;
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
  letter-spacing: 1px;
}

.footer-heading {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: var(--space-md);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-nav a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.footer-nav a:hover {
  color: var(--color-text-primary);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-contact p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.footer-bottom {
  padding-top: var(--space-lg);
  text-align: center;
}

.footer-bottom p {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    text-align: center;
  }

  .footer-nav,
  .footer-contact {
    align-items: center;
  }
}
</style>
