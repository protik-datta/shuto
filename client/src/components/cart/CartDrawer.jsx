import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Drawer from "../ui/Drawer";
import CartItem from "./CartItem";
import FreeShippingProgress from "./FreeShippingProgress";
import OrderSummary from "./OrderSummary";

export default function CartDrawer({ onClose }) {
  const { items, totals, getCartCount } = useCart();
  const count = getCartCount();

  return (
    <Drawer label="Shopping bag" onClose={onClose}>
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
        <h2 className="text-lg font-semibold">Bag ({count})</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close bag"
          className="flex h-10 w-10 items-center justify-center"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-lg font-semibold">Your bag is empty</p>
          <p className="mt-1 text-stone">Pieces you add will wait here.</p>
          <Link to="/shop/new-arrivals" className="btn btn-primary mt-6">
            Shop new arrivals
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-4">
            {items.map((item) => (
              <CartItem key={item.key} item={item} variant="drawer" />
            ))}
          </ul>
          <div className="shrink-0 space-y-4 border-t border-line p-4">
            <FreeShippingProgress
              subtotal={totals.subtotal}
              remaining={totals.freeShippingRemaining}
            />
            <OrderSummary totals={totals} />
            <div className="grid grid-cols-2 gap-3">
              <Link to="/cart" className="btn btn-outline">
                View cart
              </Link>
              <Link to="/checkout" className="btn btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}
