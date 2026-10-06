import { Eye } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { getDiscountPercent } from "../../utils/format";
import WishlistButton from "../ui/WishlistButton";
import PriceTag from "./PriceTag";
import QuickView from "./QuickView";

const badgeClass = "bg-paper px-2 py-1 text-meta font-medium";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [colorName, setColorName] = useState(product.colors[0].name);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const closeQuickView = useCallback(() => setIsQuickViewOpen(false), []);

  const soldOut = product.stock === 0;
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const href = `/product/${product.slug}`;
  const secondImage = product.images[1];

  const handleQuickAdd = (size) => {
    const added = addToCart(product, { size, color: colorName });
    showToast(
      added
        ? `Added to cart: ${product.name}, ${size}, ${colorName}`
        : "This item could not be added",
      added ? "success" : "error",
    );
  };

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-sand">
        <Link to={href} aria-label={product.name} className="block">
          <img
            src={product.images[0]}
            alt={product.name}
            width="900"
            height="1125"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          {secondImage && (
            <img
              src={secondImage}
              alt=""
              width="900"
              height="1125"
              loading="lazy"
              className="absolute inset-0 aspect-[4/5] h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {soldOut && (
            <span className={`${badgeClass} text-stone`}>Sold out</span>
          )}
          {!soldOut && product.isNew && <span className={badgeClass}>New</span>}
          {!soldOut && discount > 0 && (
            <span className={`${badgeClass} text-sale`}>-{discount}%</span>
          )}
        </div>

        <WishlistButton product={product} className="absolute right-2 top-2" />
        <button
          type="button"
          onClick={() => setIsQuickViewOpen(true)}
          aria-label={`Quick view ${product.name}`}
          className="absolute right-2 top-12 hidden h-9 w-9 items-center justify-center rounded-full bg-paper opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 md:flex"
        >
          <Eye size={18} aria-hidden="true" />
        </button>

        {!soldOut && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-paper p-2 transition-transform duration-200 ease-out group-focus-within:translate-y-0 group-hover:translate-y-0">
            {product.sizes.length === 1 ? (
              <button
                type="button"
                onClick={() => handleQuickAdd(product.sizes[0])}
                className="btn btn-primary w-full"
              >
                Add to cart
              </button>
            ) : (
              <div
                role="group"
                aria-label={`Quick add ${product.name}`}
                className="flex justify-center gap-1"
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleQuickAdd(size)}
                    className="h-9 min-w-9 flex-1 border border-line text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm leading-snug">
          <Link to={href} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          className="text-sm"
        />
        {product.colors.length > 1 && (
          <div
            role="group"
            aria-label="Colour"
            className="flex items-center gap-1.5 pt-1"
          >
            {product.colors.slice(0, 5).map(({ name, hex }) => (
              <button
                key={name}
                type="button"
                onClick={() => setColorName(name)}
                aria-label={name}
                aria-pressed={name === colorName}
                title={name}
                className={`h-3.5 w-3.5 rounded-full border border-line ${name === colorName ? "ring-1 ring-ink ring-offset-2 ring-offset-paper" : ""}`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        )}
      </div>
      {isQuickViewOpen && (
        <QuickView product={product} onClose={closeQuickView} />
      )}
    </article>
  );
}

export default memo(ProductCard);
