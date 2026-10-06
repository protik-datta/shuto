import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CartDrawer from "../components/cart/CartDrawer";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MobileMenu from "../components/layout/MobileMenu";
import SearchOverlay from "../components/layout/SearchOverlay";
import { useCart } from "../context/CartContext";

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const { isCartOpen, closeCart } = useCart();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    closeCart();
  }, [pathname, closeCart]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {isMenuOpen && <MobileMenu onClose={closeMenu} />}
      {isSearchOpen && <SearchOverlay onClose={closeSearch} />}
      {isCartOpen && <CartDrawer onClose={closeCart} />}
    </>
  );
}
