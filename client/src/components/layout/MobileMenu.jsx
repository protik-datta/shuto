import { ChevronRight, Heart, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../constants/site";
import Drawer from "../ui/Drawer";

const rowClass = "flex items-center justify-between py-3.5 text-lg font-medium";

export default function MobileMenu({ onClose }) {
  return (
    <Drawer side="left" label="Menu" onClose={onClose} widthClass="max-w-sm">
      <div className="flex h-16 items-center justify-between border-b border-line px-4">
        <span className="text-xl font-bold uppercase tracking-[0.22em]">
          {SITE.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-2">
        <ul className="divide-y divide-line">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`${rowClass} ${label === "Sale" ? "text-sale" : ""}`}
              >
                {label}
                <ChevronRight
                  size={18}
                  className="text-stone"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-6 space-y-1 border-t border-line pt-4 text-sm">
          <li>
            <Link to="/account" className="flex items-center gap-3 py-2.5">
              <User size={18} aria-hidden="true" />
              Account
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="flex items-center gap-3 py-2.5">
              <Heart size={18} aria-hidden="true" />
              Wishlist
            </Link>
          </li>
          <li>
            <Link to="/size-guide" className="block py-2.5 pl-[30px]">
              Size guide
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2.5 pl-[30px]">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </Drawer>
  );
}
