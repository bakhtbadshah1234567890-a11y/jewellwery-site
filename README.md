# Luxury Fine Jewellery E-Commerce Storefront

A responsive fine jewellery e-commerce web application built with **React 19**, **Vite 8**, **React Router 7**, and **Tailwind CSS 4**. Inspired by contemporary editorial jewellery ateliers (`heirest.com`), the storefront features an interactive multi-option configurator, dynamic product detail pages, real-time catalog filtering, slide-out cart persistence, and full brand/legal/policy routes.

## Key Features

- **Editorial Storefront & Mega Menu Navigation**: Slim rotating announcement bar, desktop hover mega menus for Shop categories & Collections, and an expandable mobile drawer.
- **Interactive 4-Category Configurator** (`src/components/GenerateDesign.jsx`): Configure Rings, Necklaces, Earrings, and Bracelets across precious metals (9K/14K/18K Yellow, White, Rose Gold, Platinum), gemstones, stone cuts, carat weights, setting styles, and custom engraving with real-time pricing (`src/utils/pricing.js`).
- **Centralized Product Catalog & Filtered Shop** (`src/data/products.js`, `src/pages/ShopPage.jsx`): Multi-facet filtering by Category, Collection, Metal, Gemstone, and Price Range synchronized with URL query parameters, sorting, wishlist toggling, and Quick View modals.
- **Dynamic Product Detail Pages (`/products/:slug`)**: Multi-angle image gallery with hover inspection, metal/gemstone swatches, carat & finger size selectors, custom engraving, technical specification tabs, and related products.
- **Persistent Cart & Live Catalog Search**: Slide-out shopping bag (`src/components/CartDrawer.jsx`) backed by `localStorage` and instant catalog search modal (`src/components/SearchModal.jsx`).
- **Collection, Editorial & Client Pages**: Dedicated routes for `/collections/:slug`, `/our-story`, `/our-process`, `/standards`, `/bespoke`, `/sizing-kits`, `/trunk-show`, `/journal`, `/journal/:slug`, `/account`, `/shipping`, `/returns`, `/warranty`, `/faq`, `/contact`, `/privacy-policy`, `/terms`, and `/cookies`.

## Tech Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Routing**: React Router 7 (`react-router-dom`)
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite`)
- **Build & Tooling**: Vite 8, Oxlint

## Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Lint codebase
npm run lint

# Build for production
npm run build
```

## Deployment

Includes `vercel.json` and `public/_redirects` for single-page application (SPA) client-side route fallbacks on Vercel and Netlify.
