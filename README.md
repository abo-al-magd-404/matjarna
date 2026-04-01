# MATJARNA — Online Electronics Store

MATJARNA is a modern, full-featured online electronics store. Designed with a seamless shopping experience in mind, it offers a curated selection of high-quality devices, accessories, and gadgets from trusted global brands—brought to users with robust authentication, shopping cart, and category browsing features.

## 🚀 Features

- **Intuitive User Experience:** Clean, responsive design with smooth landing and browsing, built using Next.js and Tailwind CSS.
- **Category & Product Browsing:** Dynamically loaded product categories with image-rich cards and fallback logic for missing assets.
- **Authentication & Protected Routes:** Secure login flows protect account, profile, and checkout pages. Middleware enforces route protection and friendly redirects.
- **Shopping Cart:** Global cart state managed via React Context for a persistent and reactive cart.
- **Partner Brands:** Showcases major electronics brands (Apple, Samsung, Dell, ROG, Lenovo, Sony, Bose, etc.).
- **Backend API Integration:** Proxied API routes via `next.config.ts` for product/category data ([example](http://matjarna.runasp.net/api/)).
- **Accessibility & Best Practices:** Uses semantic markup and best practices for accessibility and SEO.

## 🏗️ Tech Stack

- **Next.js 16.x** — App directory routing, SSR, API routes
- **React 19.x** — Component-driven UI
- **TypeScript** — Type safety across all components and data
- **Tailwind CSS 4.x** — Rapid, utility-first styling
- **PostCSS** — Processing pipeline for CSS
- **Lucide-React** — Iconography
- **Custom Context Providers:** Global state for auth and cart with `AuthContext` and `CartContext`
- **ESLint & Prettier** — Strict linting and formatting

## 📁 Project Structure

<details>
<summary><strong>Main Folders & Files</strong></summary>

- `app/` — App directory structure (pages, layouts, main entry)
    - `account/`, `admin/`, `cart/`, `categories/`, `api/` — Feature pages & routes
    - `layout.tsx` — Root layout (global providers, navbar, footer)
    - `page.tsx` — Landing page (brand, categories, partners)
- `components/` — Reusable UI: `Navbar`, `Footer`, `ProductCard`, `CategoryCard`
- `context/` — React Context: `AuthContext`, `CartContext`
- `lib/` — API utilities and helpers
- `middleware.ts` — Route protection & security logic
- `next.config.ts` — Image domains, API rewriting/proxy
- `public/` — Static assets (brand images, logos)
- `postcss.config.mjs`, `tailwind.config.js` — Styling pipeline
- `package.json`, `tsconfig.json` — Dependencies and TypeScript config

</details>

## 🛡️ Route Security

Certain routes (`/checkout`, `/profile`, `/categories/[slug]`) are protected by authentication. Unauthenticated access is automatically redirected to `/account/login`. Middleware also handles category route validation and sets CORS headers for API safety.

## 🛠️ Setup & Development

1. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

2. **Run the development server:**
    ```bash
    npm run dev
    ```

3. **Visit:** [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

- **Recommended:** [Vercel](https://vercel.com/) for zero-config Next.js deployment.

## 🤝 Partners

![Brands: Apple, Samsung, ROG, Dell, Lenovo, Sony, Bose, Logitech, Anker, Asus](public/imgs/logos/)

## 📋 License

This project is for educational and demonstration purposes.

---

> _“Your Ultimate Hub for Electronics” — Experience a smooth, modern shopping journey with MATJARNA._
