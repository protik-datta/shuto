import { Heart, RotateCcw, Truck } from "lucide-react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import ColorSelector from "../../components/product/ColorSelector";
import PriceTag from "../../components/product/PriceTag";
import QuantitySelector from "../../components/product/QuantitySelector";
import SizeSelector from "../../components/product/SizeSelector";
import StarRating from "../../components/ui/StarRating";
import { COMMERCE } from "../../constants/site";
import { useToast } from "../../context/ToastContext";
import { useWishlist } from "../../context/WishlistContext";
import { getDiscountPercent, formatPrice } from "../../utils/format";

const LOW_STOCK_LIMIT = 5;

const ProductInfo = forwardRef(function ProductInfo(
  { product, selection, onAddToCart, onBuyNow },
  ctaRef,
) {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const soldOut = product.stock === 0;
  const discount = getDiscountPercent(product.price, product.originalPrice);

  const toggleWishlist = () => {
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product.id);
    showToast(wishlisted ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h1 font-semibold">{product.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            className="text-lg"
          />
          {discount > 0 && (
            <span className="bg-sale px-2 py-0.5 text-meta font-medium text-paper">
              -{discount}%
            </span>
          )}
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm text-stone">
          <StarRating rating={product.rating} /> {product.rating} (
          {product.reviewCount} reviews)
        </p>
      </div>

      <p className="text-charcoal">{product.description}</p>

      {product.colors.length > 1 && (
        <ColorSelector
          colors={product.colors}
          value={selection.color}
          onChange={selection.setColor}
        />
      )}

      <div>
        <SizeSelector
          sizes={product.sizes}
          value={selection.size}
          onChange={selection.selectSize}
          error={selection.error}
        />
        {product.sizes.length > 1 && (
          <Link
            to="/size-guide"
            className="link-underline mt-3 inline-block text-sm"
          >
            Size guide
          </Link>
        )}
      </div>

      {!soldOut && (
        <div>
          <QuantitySelector
            value={selection.quantity}
            max={selection.maxQuantity}
            onChange={selection.setQuantity}
          />
          {product.stock <= LOW_STOCK_LIMIT && (
            <p className="mt-2 text-sm text-sale">
              Only {product.stock} left in stock
            </p>
          )}
        </div>
      )}

      <div ref={ctaRef} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <button
          type="button"
          onClick={() => onAddToCart()}
          disabled={soldOut}
          className="btn btn-primary h-12"
        >
          {soldOut ? "Sold out" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className="btn btn-outline h-12 w-full sm:w-12 sm:px-0"
        >
          <Heart
            size={20}
            fill={wishlisted ? "currentColor" : "none"}
            aria-hidden="true"
          />
          <span className="sm:hidden">
            {wishlisted ? "Saved" : "Save to wishlist"}
          </span>
        </button>
        {!soldOut && (
          <button
            type="button"
            onClick={onBuyNow}
            className="btn btn-outline h-12 sm:col-span-2"
          >
            Buy now
          </button>
        )}
      </div>

      <ul className="space-y-2 border-y border-line py-4 text-sm">
        <li className="flex items-center gap-3">
          <Truck size={18} aria-hidden="true" />
          Dhaka in 1 to 2 days. Elsewhere in 3 to 5 days.
        </li>
        <li className="flex items-center gap-3">
          <RotateCcw size={18} aria-hidden="true" />
          Free exchange or refund within {COMMERCE.returnWindowDays} days.
        </li>
      </ul>

      <div className="text-sm">
        {[
          {
            title: "Details and material",
            body: `${product.material}. ${product.description}`,
          },
          { title: "Care", body: product.care },
          {
            title: "Delivery",
            body: `Free delivery on orders over ${formatPrice(COMMERCE.freeShippingThreshold)}. Standard delivery is ${formatPrice(COMMERCE.standardShippingFee)}, express is ${formatPrice(COMMERCE.expressShippingFee)}.`,
          },
        ].map(({ title, body }) => (
          <details key={title} className="group border-b border-line py-3">
            <summary className="cursor-pointer list-none font-medium [&::-webkit-details-marker]:hidden">
              {title}
            </summary>
            <p className="pt-2 text-charcoal">{body}</p>
          </details>
        ))}
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 pt-4 text-meta text-stone">
          <dt>SKU</dt>
          <dd>{product.sku}</dd>
          <dt>Availability</dt>
          <dd>{soldOut ? "Sold out" : "In stock"}</dd>
        </dl>
      </div>
    </div>
  );
});

export default ProductInfo;
