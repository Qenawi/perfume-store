# Vayn Perfumes

A luxury perfume e-commerce store built with Vue 3 + Vite, hosted on GitHub Pages.

## Features

- Product catalog with category filtering (Men, Women, Unisex)
- Bottle size and color selection
- Cart with localStorage persistence
- WhatsApp order integration (no payment gateway)
- Order tracking via Firebase Firestore
- Dynamic time-based greeting
- Responsive dark luxury theme
- All text configurable from a single config file

## Tech Stack

- **Frontend**: Vue 3, Vue Router, Vite
- **Database**: Firebase Firestore + Storage
- **Hosting**: GitHub Pages
- **Font**: Inter (Helvetica alternative)
- **Cart**: localStorage

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Configuration

All site text, branding, and settings are in **`src/config/site.js`**:

| Section | What it controls |
|---|---|
| `brand` | Store name, tagline |
| `hero` | Homepage hero title, subtitle, CTA |
| `shop` | Shop page title, categories |
| `home` | Featured section headings |
| `product` | Size/color labels, button text |
| `cart` | Cart text, disclaimer |
| `whatsapp` | Phone number, order header |
| `footer` | Footer headings, email, copyright |
| `tracking` | Firestore collection path |
| `currency` | Currency label (default: EGP) |
| `siteTitle` | Browser tab title |

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore** and **Storage**
3. Copy your config into `src/firebase/config.js`:

```js
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef',
}
```

4. Set Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: true;
      allow write: if false;
    }
    match /vayn/perfums/actions/{actionId} {
      allow create: true;
      allow read, update, delete: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

5. Create a `products` collection with documents:

```json
{
  "name": "Oud Royal",
  "brand": "Vayn",
  "price": 120,
  "category": "men",
  "description": "A rich, woody fragrance...",
  "imageUrl": "https://firebasestorage.googleapis.com/...",
  "featured": true,
  "inStock": true,
  "sizes": [
    { "label": "30ml", "price": 70 },
    { "label": "50ml", "price": 120 },
    { "label": "100ml", "price": 180 }
  ],
  "colors": [
    { "name": "Classic Black", "hex": "#1a1a1a" },
    { "name": "Dark Amber", "hex": "#8B4513" }
  ]
}
```

6. Switch from dummy data to Firebase: set `USE_DUMMY = false` in `src/composables/useProducts.js` and uncomment the Firebase imports.

## Switching from Dummy Data

The store ships with 8 dummy products for testing. To use real Firebase data:

1. Fill in `src/firebase/config.js` with your credentials
2. Open `src/composables/useProducts.js`
3. Set `USE_DUMMY = false`
4. Uncomment the Firebase import lines at the top

## Deploy to GitHub Pages

1. Create a GitHub repo named `perfum_store`
2. Push your code
3. Run `npm run deploy`
4. Enable Pages in repo Settings > Pages > Source: `gh-pages` branch

Your site will be live at `https://<username>.github.io/perfum_store/`

## Project Structure

```
src/
├── assets/styles/      # Design system (variables.css, main.css)
├── components/         # Navbar, Footer, HeroBanner, ProductCard,
│                       # ProductGrid, CategoryFilter, CartDrawer, CartItem
├── composables/        # useCart, useProducts, useTracking
├── config/site.js      # All configurable text & settings
├── firebase/config.js  # Firebase credentials
├── router/index.js     # Vue Router (hash mode)
├── views/              # HomeView, ShopView, ProductView
├── App.vue
└── main.js
```

## License

MIT
