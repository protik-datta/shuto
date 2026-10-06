import { formatPrice, getDiscountPercent } from "../../utils/format";

export default function PriceTag({ price, originalPrice, className = "" }) {
  const onSale = getDiscountPercent(price, originalPrice) > 0;
  return (
    <p className={`flex items-baseline gap-2 ${className}`}>
      <span className={onSale ? "font-medium text-sale" : "font-medium"}>
        {formatPrice(price)}
      </span>
      {onSale && (
        <s className="text-sm text-stone">{formatPrice(originalPrice)}</s>
      )}
    </p>
  );
}
