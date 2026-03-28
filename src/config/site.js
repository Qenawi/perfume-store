// ========================================
// Site Configuration — Edit all fixed text here
// ========================================

export default {
  // --- Brand ---
  brand: {
    name: 'Vayn',
    tagline: 'Perfumes',
    fullName: 'Vayn Perfumes',
    description: 'The art of fragrance',
  },

  // --- Hero Section ---
  hero: {
    title: 'Discover Your Signature Scent',
    subtitle: 'Luxury fragrances crafted for those who appreciate the finer things in life',
    ctaText: 'Explore Collection',
  },

  // --- Shop Page ---
  shop: {
    title: 'Our Collection',
    subtitle: 'Explore our curated selection of luxury fragrances',
    emptyText: 'No products found',
    categories: [
      { label: 'All', value: 'all' },
      { label: 'Men', value: 'men' },
      { label: 'Women', value: 'women' },
      { label: 'Unisex', value: 'unisex' },
    ],
  },

  // --- Home Page ---
  home: {
    featuredTitle: 'Featured Fragrances',
    featuredSubtitle: 'Our most coveted scents, handpicked for you',
  },

  // --- Product Page ---
  product: {
    sizeLabel: 'Bottle Size',
    colorLabel: 'Bottle Color',
    addToCart: 'Add to Cart',
    backToShop: 'Back to Shop',
    outOfStock: 'Out of Stock',
  },

  // --- Cart ---
  cart: {
    title: 'Your Cart',
    emptyText: 'Your cart is empty',
    browseText: 'Browse Products',
    totalLabel: 'Total',
    clearText: 'Clear Cart',
    whatsappText: 'Continue on WhatsApp',
    disclaimer: 'This is not a payment. By continuing, your order details will be sent via WhatsApp for confirmation and further processing.',
  },

  // --- WhatsApp ---
  whatsapp: {
    number: '01033226855', // Replace with your number (country code, no + or spaces)
    orderHeader: 'New Order from TJW Perfumes',
  },

  // --- Footer ---
  footer: {
    navHeading: 'Navigation',
    contactHeading: 'Contact',
    email: 'info@tjwperfumes.com',
    contactNote: 'WhatsApp available',
    copyright: 'Vayn Perfumes. All rights reserved.',
  },

  // --- Tracking / Analytics ---
  tracking: {
    // Firestore path: {storeName}/perfums/actions
    storeName: 'vayn',       // Change to your store name
    collection: 'perfums',   // Sub-collection name
    subCollection: 'actions', // Where order actions are stored
  },

  // --- Currency ---
  currency: 'EGP',

  // --- SEO / Page Title ---
  siteTitle: 'Vayn Perfumes',
}
