import { ref, computed, watch } from 'vue'

const CART_KEY = 'tjw_perfume_cart'

function loadCart() {
  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const cart = ref(loadCart())

watch(cart, (val) => {
  localStorage.setItem(CART_KEY, JSON.stringify(val))
}, { deep: true })

function cartItemKey(productId, size, color) {
  return `${productId}_${size || 'default'}_${color || 'default'}`
}

export function useCart() {
  const cartCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function addToCart(product, selectedSize, selectedColor) {
    const key = cartItemKey(product.id, selectedSize, selectedColor)
    const existing = cart.value.find((item) => item.cartKey === key)

    const sizeObj = product.sizes?.find((s) => s.label === selectedSize)
    const price = sizeObj ? sizeObj.price : product.price

    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({
        cartKey: key,
        id: product.id,
        name: product.name,
        brand: product.brand,
        price,
        imageUrl: product.imageUrl,
        size: selectedSize || null,
        color: selectedColor || null,
        quantity: 1,
      })
    }
  }

  function removeFromCart(cartKey) {
    cart.value = cart.value.filter((item) => item.cartKey !== cartKey)
  }

  function updateQuantity(cartKey, quantity) {
    const item = cart.value.find((item) => item.cartKey === cartKey)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(cartKey)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    cart.value = []
  }

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
