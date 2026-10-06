import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants/site";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import useScrolled from "../../hooks/useScrolled";
import Logo from "./Logo";

const iconButton =
  "relative flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60";

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-paper">
      {count}
    </span>
  );
}

export default function Header({ onOpenMenu, onOpenSearch }) {
  const { getCartCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const scrolled = useScrolled();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div
        className={`container-page grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-200 ${
          scrolled ? "h-14" : "h-16 lg:h-[72px]"
        }`}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className={`${iconButton} -ml-2 lg:hidden`}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
          <Logo className="hidden lg:block" />
        </div>

        <div className="flex justify-center">
          <Logo className="lg:hidden" />
          <nav
            aria-label="Main"
            className="hidden items-center gap-8 text-sm font-medium lg:flex"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `border-b py-1 transition-colors ${isActive ? "border-ink" : "border-transparent hover:border-stone"} ${
                    label === "Sale" ? "text-sale" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            className={iconButton}
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className={`${iconButton} hidden lg:flex`}
          >
            <User size={20} aria-hidden="true" />
          </Link>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className={`${iconButton} hidden lg:flex`}
          >
            <Heart size={20} aria-hidden="true" />
            <CountBadge count={wishlistCount} />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag, ${cartCount} items`}
            className={`${iconButton} -mr-2 lg:mr-0`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            <CountBadge count={cartCount} />
          </button>
        </div>
      </div>
    </header>
  );
}
