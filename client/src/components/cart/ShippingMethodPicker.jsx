import { useCart } from "../../context/CartContext";
import { SHIPPING_METHODS, calculateTotals } from "../../lib/pricing";
import { formatPrice } from "../../utils/format";

export default function ShippingMethodPicker() {
  const { totals, couponCode, shippingMethod, setShippingMethod } = useCart();
  const standardIsFree =
    calculateTotals({
      subtotal: totals.subtotal,
      couponCode,
      shippingMethod: "standard",
    }).shipping === 0;

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Delivery</legend>
      <div className="space-y-2">
        {Object.entries(SHIPPING_METHODS).map(
          ([id, { label, detail, fee }]) => (
            <label
              key={id}
              className="flex cursor-pointer items-center gap-3 border border-line bg-white p-3 text-sm has-[:checked]:border-ink"
            >
              <input
                type="radio"
                name="shipping"
                value={id}
                checked={shippingMethod === id}
                onChange={() => setShippingMethod(id)}
                className="accent-ink"
              />
              <span className="flex-1">
                {label}
                <span className="block text-meta text-stone">{detail}</span>
              </span>
              <span>
                {id === "standard" && standardIsFree
                  ? "Free"
                  : formatPrice(fee)}
              </span>
            </label>
          ),
        )}
      </div>
    </fieldset>
  );
}
