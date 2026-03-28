import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import config from '../config/site'

const { storeName, collection: col, subCollection } = config.tracking

// Path: {storeName}/perfums/actions
const actionsRef = collection(db, storeName, col, subCollection)

export function useTracking() {
  async function trackOrder(cartItems, total) {
    try {
      await addDoc(actionsRef, {
        type: 'whatsapp_order',
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          size: item.size || null,
          color: item.color || null,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        itemCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      // Silent fail — don't block the user
      console.warn('Order tracking failed:', err.message)
    }
  }

  return { trackOrder }
}
