# QUICK CART  — Next.js Application

A product browsing and cart application built with **Next.js 16 (App Router)** and the [DummyJSON Products API](https://dummyjson.com/docs/products).**shadcn/ui**, and **next-themes** for dark/light mode support.

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/Gowrisankar24/product-catalog-next-app.git
cd product-catalog-next-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Features

| Feature | Details |
|---|---|
| **Product Listing** | Grid of 30 products fetched from DummyJSON, with image, title, and price |
| **Product Detail** | Full product page with images, description, rating, stock, and add-to-cart |
| **Cart** | Add, remove, update quantity; persists across page reloads via `localStorage` |
| **Cart Badge** | Live item count in the sticky navbar |
| **UI Components** | Built with [shadcn/ui](https://ui.shadcn.com/) — accessible, composable React components styled with Tailwind CSS |
| **Error Handling** | API errors and 404s are caught and shown gracefully |

### Setup
 
shadcn/ui is already configured in this project. If you want to add more components, run:
 
```bash
npx shadcn@latest add <component-name>
# e.g.
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
```
 
Components are copied into `components/ui/` and can be customised freely. They are **not** an external package dependency — you own the code.

## Approach & Design Choices

### Next.js App Router

The project uses the App Router introduced in Next.js 13+. Product list and detail pages are **React Server Components** — data is fetched on the server with `next: { revalidate: 60 }` for ISR caching. Only components that require interactivity (`AddToCartButton`, `CartContext`, 'theme', the Cart page) are marked `"use client"`.

### shadcn/ui + Tailwind CSS
 
shadcn/ui components are built on top of **Base UI** primitives and styled with **Tailwind CSS**. Because components live inside the project, they can be fully customised without fighting a third-party API.

### Error Handling

- API calls are wrapped in `try/catch`; HTTP errors throw descriptive messages.
- Product-not-found triggers Next.js `notFound()` which renders the custom 404 page.
- A reusable `<ErrorMessage>` component handles unexpected errors on any page.

---

## Project Structure

```
app/
├── cart/
|   └── CartContext.tsx          # Cart / add to cart feature
├── component/
|   ├── common/
|   |    └── ReusableErrMsg.tsx   # err handling
|   ├── sidebar/
|   |    └── Sidebar.tsx          # Sidebar
│   ├── AddToCartButton.tsx       # Add to cart feature
│   ├── ProductCard.tsx           # Product overview card
│   └── ThemeSwitch.tsx           # Theme Switch
├── context/
│   └── CartContext.tsx           # Cart state + localStorage persistence
├── lib/
│   ├── api.ts                    # fetchProducts() + fetchProduct(id)
│   ├── cartReducer.ts            # Manage state logic
│   └── types.ts                  # Shared TypeScript types
├── products/[productId]/         # Dynamic product detail route
├── global.css                    # global css file
├── layout.tsx                    # Root layout (CartProvider + Navbar)
├── not-found.tsx                 # 404 page
└── page.tsx                      # Catalog Page / product listing
```
---
