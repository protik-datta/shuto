import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { COMMERCE } from "../../constants/site";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import QuantitySelector from "../product/QuantitySelector";

export default function CartItem({ item, variant = "page" }) {
  const { removeFromCart, updateQuantity, saveForLater } = useCart();
  const { key, product, size, color, quantity, lineTotal } = item;
  const isPage = variant === "page";
  const maxQuantity = Math.min(COMMERCE.maxQuantityPerItem, product.stock);
  const href = `/product/${product.slug}`;

  return (
    <li
      className={`grid gap-4 py-5 ${isPage ? "grid-cols-[96px_1fr] sm:grid-cols-[120px_1fr]" : "grid-cols-[80px_1fr]"}`}
    >
      <Link to={href} className="block bg-sand">
        <img
          src={product.images[0]}
          alt={product.name}
          width="240"
          height="300"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-col">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium leading-snug">
              <Link to={href} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-meta text-stone">
              {[size !== "One size" && `Size ${size}`, color]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium">
            {formatPrice(lineTotal)}
          </p>
        </div>
        {quantity > 1 && (
          <p className="text-meta text-stone">
            {formatPrice(product.price)} each
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <QuantitySelector
            compact
            value={quantity}
            max={maxQuantity}
            onChange={(next) => updateQuantity(key, next)}
            label={`Quantity for ${product.name}`}
          />
          <div className="flex items-center gap-4 text-sm">
            {isPage && (
              <button
                type="button"
                onClick={() => saveForLater(key)}
                className="link-underline"
              >
                Save for later
              </button>
            )}
            <button
              type="button"
              onClick={() => removeFromCart(key)}
              aria-label={`Remove ${product.name} from bag`}
              className="flex items-center gap-1.5 text-stone hover:text-ink"
            >
              <Trash2 size={16} aria-hidden="true" />
              {isPage && "Remove"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
