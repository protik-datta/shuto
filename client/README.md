# Shuto storefront (frontend demo)

React 18 + Vite + Tailwind CSS 4 + React Router 6 + Lucide icons. No backend: products, orders and the demo account are local mock data,
and cart / wishlist / recent searches / recently viewed / orders / account are kept in localStorage.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```

## Where things live
- `src/constants/site.js`  brand details, shipping rules, nav links, storage keys (change brand or thresholds here)
- `src/index.css`          design tokens (colour, type scale, radius) and shared .btn / .input classes
- `src/data/`              products (37), categories, collections, reviews, FAQ, size guide, mock orders
- `src/lib/`               pure logic: catalog, listing (filter/sort), search, pricing, orders, validation, images
- `src/context/`           Cart, Wishlist and Toast state
- `src/pages/`             one folder per route (lazy loaded from `src/routes/pages.js`)

## Replacing the placeholder images
Product images come from `productImages()` and editorial images from `editorialImage()` in `src/lib/images.js`
(both currently return picsum.photos placeholders). Point them at real photography and every page updates.

## Demo-only behaviour
Coupons (SHUTO10, WELCOME200, FREESHIP), payment methods, order numbers and the account are simulated in the browser.
No payment is processed and no message or email leaves the page.
