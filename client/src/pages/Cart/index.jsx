import { X } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import CouponForm from "../../components/cart/CouponForm";
import FreeShippingProgress from "../../components/cart/FreeShippingProgress";
import OrderSummary from "../../components/cart/OrderSummary";
import ShippingMethodPicker from "../../components/cart/ShippingMethodPicker";
import EmptyState from "../../components/ui/EmptyState";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";
import { formatPrice } from "../../utils/format";

function SavedItems() {
  const { savedItems, moveToCart, removeSaved } = useCart();
  const { showToast } = useToast();
  if (!savedItems.length) return null;

  const handleMove = (key) => {
    if (!moveToCart(key)) showToast("This item is sold out right now", "error");
  };

  return (
    <section aria-labelledby="saved-heading" className="mt-12">
      <h2 id="saved-heading" className="text-h2 font-semibold">
        Saved for later
      </h2>
      <ul className="mt-2 divide-y divide-line border-t border-line">
        {savedItems.map(({ key, product, size, color }) => (
          <li key={key} className="flex items-center gap-4 py-4">
            <Link
              to={`/product/${product.slug}`}
              className="w-16 shrink-0 bg-sand"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                width="128"
                height="160"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-medium">{product.name}</p>
              <p className="text-meta text-stone">
                {[size !== "One size" && `Size ${size}`, color]
                  .filter(Boolean)
                  .join(", ")}{" "}
                &middot; {formatPrice(product.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleMove(key)}
              className="btn btn-outline min-h-10 px-4"
            >
              Move to bag
            </button>
            <button
              type="button"
              onClick={() => removeSaved(key)}
              aria-label={`Remove ${product.name} from saved items`}
              className="p-2 text-stone hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Cart() {
  const { items, totals, getCartCount } = useCart();
  usePageMeta({ title: "Bag", description: "Review the items in your bag." });

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-h1 font-semibold">
        Your bag
        {items.length > 0 && (
          <span className="text-stone"> ({getCartCount()})</span>
        )}
      </h1>

      {items.length === 0 ? (
        <>
          <EmptyState
            title="Your bag is empty"
            text="Add a few pieces and they will be waiting here."
            actionLabel="Shop new arrivals"
            actionTo="/shop/new-arrivals"
          />
          <SavedItems />
        </>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <CartItem key={item.key} item={item} />
              ))}
            </ul>
            <SavedItems />
          </div>

          <aside
            aria-label="Order summary"
            className="space-y-6 self-start border border-line bg-white p-5 lg:sticky lg:top-24"
          >
            <h2 className="text-lg font-semibold">Order summary</h2>
            <CouponForm />
            <ShippingMethodPicker />
            <FreeShippingProgress
              subtotal={totals.subtotal}
              remaining={totals.freeShippingRemaining}
            />
            <OrderSummary totals={totals} />
            <Link to="/checkout" className="btn btn-primary w-full">
              Checkout
            </Link>
            <Link
              to="/shop"
              className="link-underline block text-center text-sm"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
