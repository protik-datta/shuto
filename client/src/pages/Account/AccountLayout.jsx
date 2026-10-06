import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block py-2 text-sm ${isActive ? "font-semibold" : "text-charcoal hover:text-ink"}`;

export default function AccountLayout({ children }) {
  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-h1 font-semibold">My account</h1>
      <p className="mt-2 max-w-xl text-sm text-stone">
        Demo account with sample data. Anything you change is saved only in this
        browser.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] lg:gap-16">
        <nav
          aria-label="Account"
          className="flex gap-5 overflow-x-auto border-b border-line md:block md:overflow-visible md:border-b-0 md:border-r md:pr-6"
        >
          <NavLink to="/account" end className={linkClass}>
            Profile
          </NavLink>
          <a
            href="/account#addresses"
            className="block py-2 text-sm text-charcoal hover:text-ink"
          >
            Addresses
          </a>
          <a
            href="/account#preferences"
            className="block py-2 text-sm text-charcoal hover:text-ink"
          >
            Preferences
          </a>
          <NavLink to="/account/orders" className={linkClass}>
            Orders
          </NavLink>
          <NavLink to="/wishlist" className={linkClass}>
            Wishlist
          </NavLink>
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
