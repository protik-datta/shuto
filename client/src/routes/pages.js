import { lazy } from "react";

const Shop = lazy(() => import("../pages/Shop"));

export const PAGES = {
  "/": lazy(() => import("../pages/Home")),
  "/shop": Shop,
  "/shop/:category": Shop,
  "/product/:slug": lazy(() => import("../pages/Product")),
  "/cart": lazy(() => import("../pages/Cart")),
  "/wishlist": lazy(() => import("../pages/Wishlist")),
  "/search": lazy(() => import("../pages/Search")),
  "/checkout": lazy(() => import("../pages/Checkout")),
  "/account": lazy(() => import("../pages/Account")),
  "/account/orders": lazy(() => import("../pages/Account/Orders")),
  "/account/orders/:id": lazy(() => import("../pages/Account/OrderDetails")),
  "/about": lazy(() => import("../pages/About")),
  "/contact": lazy(() => import("../pages/Contact")),
  "/faq": lazy(() => import("../pages/FAQ")),
  "/size-guide": lazy(() => import("../pages/SizeGuide")),
  "/404": lazy(() => import("../pages/NotFound")),
};

export const NotFoundPage = PAGES["/404"];
