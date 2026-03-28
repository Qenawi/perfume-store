import { ref } from 'vue'
// import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
// import { db } from '../firebase/config'

// TODO: Remove dummy data and uncomment Firebase imports when ready
const USE_DUMMY = true

const dummyProducts = [
  {
    id: '1',
    name: 'Oud Royal',
    brand: 'TJW',
    price: 120,
    category: 'men',
    description: 'A rich, woody fragrance with deep oud notes blended with smoky leather and warm amber. This bold scent commands attention and leaves a lasting impression. Perfect for evening occasions and those who appreciate a powerful, sophisticated signature.',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea081ac37b0?w=600&h=800&fit=crop',
    featured: true,
    inStock: true,
    sizes: [
      { label: '30ml', price: 70 },
      { label: '50ml', price: 120 },
      { label: '100ml', price: 180 },
    ],
    colors: [
      { name: 'Classic Black', hex: '#1a1a1a' },
      { name: 'Dark Amber', hex: '#8B4513' },
    ],
  },
  {
    id: '2',
    name: 'Rose Elixir',
    brand: 'TJW',
    price: 95,
    category: 'women',
    description: 'An enchanting floral composition built around Damascus rose, softened by velvety peony petals and a whisper of musk. Elegant and feminine, this fragrance captures the essence of a midnight garden in full bloom.',
    imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop',
    featured: true,
    inStock: true,
    sizes: [
      { label: '30ml', price: 55 },
      { label: '50ml', price: 95 },
      { label: '100ml', price: 150 },
    ],
    colors: [
      { name: 'Rose Pink', hex: '#C4758B' },
      { name: 'Crystal Clear', hex: '#E8E0D4' },
      { name: 'Burgundy', hex: '#722F37' },
    ],
  },
  {
    id: '3',
    name: 'Amber Noir',
    brand: 'TJW',
    price: 140,
    category: 'unisex',
    description: 'A mysterious blend of rich amber, dark vanilla, and exotic spices. This unisex fragrance wraps you in warmth and intrigue, with subtle hints of sandalwood and tonka bean lingering on the skin for hours.',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop',
    featured: true,
    inStock: true,
    sizes: [
      { label: '50ml', price: 140 },
      { label: '100ml', price: 210 },
    ],
    colors: [
      { name: 'Smoke Black', hex: '#2C2C2C' },
      { name: 'Amber Gold', hex: '#FFBF00' },
    ],
  },
  {
    id: '4',
    name: 'Vetiver Luxe',
    brand: 'TJW',
    price: 110,
    category: 'men',
    description: 'A refined masculine fragrance anchored by earthy vetiver and green bergamot. Layers of cedarwood and white pepper add complexity, creating a scent that is both fresh and deeply grounding.',
    imageUrl: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=800&fit=crop',
    featured: false,
    inStock: true,
    sizes: [
      { label: '30ml', price: 65 },
      { label: '50ml', price: 110 },
      { label: '100ml', price: 170 },
    ],
    colors: [
      { name: 'Forest Green', hex: '#2D4A3E' },
      { name: 'Matte Black', hex: '#1C1C1C' },
    ],
  },
  {
    id: '5',
    name: 'Jasmine Dreams',
    brand: 'TJW',
    price: 85,
    category: 'women',
    description: 'A delicate yet captivating scent where night-blooming jasmine meets soft iris and creamy coconut. Light and airy with an elegant dry-down, perfect for daytime wear and warm weather.',
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop',
    featured: false,
    inStock: true,
    sizes: [
      { label: '30ml', price: 50 },
      { label: '50ml', price: 85 },
      { label: '100ml', price: 135 },
    ],
    colors: [
      { name: 'Ivory White', hex: '#FFFFF0' },
      { name: 'Soft Lilac', hex: '#C8A2C8' },
    ],
  },
  {
    id: '6',
    name: 'Santal Blanc',
    brand: 'TJW',
    price: 130,
    category: 'unisex',
    description: 'Creamy Australian sandalwood meets bright citrus and a hint of cardamom in this contemporary classic. A sophisticated everyday scent that feels luxurious yet effortless.',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea081ac37b0?w=600&h=800&fit=crop',
    featured: true,
    inStock: true,
    sizes: [
      { label: '30ml', price: 75 },
      { label: '50ml', price: 130 },
      { label: '100ml', price: 195 },
    ],
    colors: [
      { name: 'Sandstone', hex: '#C2B280' },
      { name: 'Warm White', hex: '#F5F0E8' },
    ],
  },
  {
    id: '7',
    name: 'Musk Velvet',
    brand: 'TJW',
    price: 75,
    category: 'women',
    description: 'A sensual veil of white musk enhanced by soft magnolia and powdery heliotrope. This intimate fragrance stays close to the skin, creating an alluring aura of understated elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop',
    featured: false,
    inStock: true,
    sizes: [
      { label: '30ml', price: 45 },
      { label: '50ml', price: 75 },
      { label: '100ml', price: 120 },
    ],
    colors: [
      { name: 'Blush Pink', hex: '#DE9E9E' },
      { name: 'Pearl White', hex: '#F0EAD6' },
      { name: 'Mauve', hex: '#E0B0FF' },
    ],
  },
  {
    id: '8',
    name: 'Cedar & Smoke',
    brand: 'TJW',
    price: 105,
    category: 'men',
    description: 'Rugged yet refined, this fragrance blends smoky birch tar with aromatic cedarwood and a touch of black pepper. A scent for the modern gentleman who values authenticity and character.',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop',
    featured: false,
    inStock: true,
    sizes: [
      { label: '50ml', price: 105 },
      { label: '100ml', price: 165 },
    ],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Deep Brown', hex: '#3E2723' },
    ],
  },
]

export function useProducts() {
  const products = ref([])
  const product = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      if (USE_DUMMY) {
        products.value = dummyProducts
      } else {
        // const snapshot = await getDocs(collection(db, 'products'))
        // products.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id) {
    loading.value = true
    error.value = null
    try {
      if (USE_DUMMY) {
        const found = dummyProducts.find((p) => p.id === id)
        if (found) {
          product.value = found
        } else {
          error.value = 'Product not found'
        }
      } else {
        // const docSnap = await getDoc(doc(db, 'products', id))
        // if (docSnap.exists()) {
        //   product.value = { id: docSnap.id, ...docSnap.data() }
        // } else {
        //   error.value = 'Product not found'
        // }
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(category) {
    loading.value = true
    error.value = null
    try {
      if (USE_DUMMY) {
        products.value = dummyProducts.filter((p) => p.category === category)
      } else {
        // const q = query(collection(db, 'products'), where('category', '==', category))
        // const snapshot = await getDocs(q)
        // products.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchFeatured() {
    loading.value = true
    error.value = null
    try {
      if (USE_DUMMY) {
        products.value = dummyProducts.filter((p) => p.featured)
      } else {
        // const q = query(collection(db, 'products'), where('featured', '==', true))
        // const snapshot = await getDocs(q)
        // products.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchByCategory,
    fetchFeatured,
  }
}
