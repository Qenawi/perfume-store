# Vayn Perfumes

A luxury perfume e-commerce store built with Vue 3 + Vite, hosted on GitHub Pages.

**Live:** [https://qenawi.github.io/perfume-store/](https://qenawi.github.io/perfume-store/)

## Features

- Product catalog with category filtering (Men, Women, Unisex)
- Bottle size and color selection per product
- Cart with localStorage persistence
- WhatsApp order integration (no payment gateway)
- Silent order tracking via Firebase Firestore
- Dynamic time-based greeting (Good Morning / Afternoon / Evening)
- Responsive dark luxury theme with gold accents
- All text and branding configurable from a single config file
- Currency: EGP (configurable)
- Auto-deploy via GitHub Actions CI/CD

## Tech Stack

- **Frontend**: Vue 3, Vue Router, Vite
- **Database**: Firebase Firestore + Storage
- **Hosting**: GitHub Pages (via GitHub Actions)
- **Font**: Inter (Google Fonts)
- **Cart**: localStorage
- **Orders**: WhatsApp + Firestore tracking

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
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

6. Switch from dummy data: set `USE_DUMMY = false` in `src/composables/useProducts.js` and uncomment the Firebase imports.

## Deployment

Deployment is automatic via GitHub Actions. Every push to `main` triggers a build and deploy.

### Setup (one time)
1. Go to repo **Settings > Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow builds and deploys automatically

### Manual deploy
```bash
npm run build
```

### Important
- `vite.config.js` base path must match the repo name: `/perfume-store/`
- If you rename the repo, update the `base` value accordingly

## Project Structure

```
src/
├── assets/styles/        # Design system (variables.css, main.css)
├── components/           # Navbar, Footer, HeroBanner, ProductCard,
│                         # ProductGrid, CategoryFilter, CartDrawer, CartItem
├── composables/
│   ├── useCart.js         # Cart state + localStorage sync
│   ├── useProducts.js     # Product fetching (dummy / Firebase)
│   └── useTracking.js     # Silent order logging to Firestore
├── config/site.js         # All configurable text & settings
├── firebase/config.js     # Firebase credentials (placeholder)
├── router/index.js        # Vue Router (hash mode)
├── views/
│   ├── HomeView.vue       # Hero + featured products
│   ├── ShopView.vue       # Category filter + full catalog
│   └── ProductView.vue    # Product detail with size/color pickers
├── App.vue
└── main.js
```

## License

MIT
