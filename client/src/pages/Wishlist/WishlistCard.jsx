import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PriceTag from "../../components/product/PriceTag";
import QuickView from "../../components/product/QuickView";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistCard({ product }) {
  const { removeFromWishlist } = useWishlist();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const closePicker = useCallback(() => setIsPickerOpen(false), []);
  const soldOut = product.stock === 0;

  return (
    <li>
      <div className="relative bg-sand">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            width="900"
            height="1125"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </Link>
        <button
          type="button"
          onClick={() => removeFromWishlist(product.id)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-paper"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <h3 className="mt-3 text-sm leading-snug">
        <Link to={`/product/${product.slug}`} className="hover:underline">
          {product.name}
        </Link>
      </h3>
      <PriceTag
        price={product.price}
        originalPrice={product.originalPrice}
        className="mt-1 text-sm"
      />
      <button
        type="button"
        onClick={() => setIsPickerOpen(true)}
        disabled={soldOut}
        className="btn btn-outline mt-3 w-full"
      >
        {soldOut ? "Sold out" : "Add to cart"}
      </button>
      {isPickerOpen && <QuickView product={product} onClose={closePicker} />}
    </li>
  );
}
