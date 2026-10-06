import { Heart } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistButton({ product, className = "" }) {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();
  const active = isWishlisted(product.id);

  const handleClick = () => {
    if (active) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      showToast("Saved to wishlist");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${product.name} from wishlist`
          : `Save ${product.name} to wishlist`
      }
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-paper transition-transform duration-200 hover:scale-105 ${className}`}
    >
      <Heart
        size={18}
        fill={active ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
