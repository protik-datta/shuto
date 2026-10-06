import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";
import MainLayout from "./layouts/MainLayout";
import { NotFoundPage, PAGES } from "./routes/pages";

const pageFallback = <div className="min-h-[60vh]" aria-busy="true" />;

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Suspense fallback={pageFallback}>
              <Routes>
                <Route element={<MainLayout />}>
                  {Object.entries(PAGES).map(([path, Page]) => (
                    <Route key={path} path={path} element={<Page />} />
                  ))}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
