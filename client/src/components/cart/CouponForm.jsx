import { X } from "lucide-react";
import { useId, useState } from "react";
import { useCart } from "../../context/CartContext";
import { COUPONS } from "../../lib/pricing";

export default function CouponForm() {
  const { couponCode, applyCoupon, removeCoupon, totals } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const messageId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = applyCoupon(code);
    setMessage(result.valid ? "" : result.message);
    if (result.valid) setCode("");
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between border border-line bg-white px-3 py-2.5 text-sm">
        <span>
          <strong>{couponCode}</strong> applied
          {!totals.couponActive && (
            <span className="block text-meta text-sale">
              Cart total is below the minimum for this code.
            </span>
          )}
          {totals.couponActive && (
            <span className="block text-meta text-stone">
              {COUPONS[couponCode].label}
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={removeCoupon}
          aria-label="Remove promo code"
          className="p-1"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Promo code"
          aria-label="Promo code"
          aria-invalid={Boolean(message)}
          aria-describedby={message ? messageId : undefined}
          className="input min-w-0 flex-1 rounded-r-none border-r-0"
        />
        <button type="submit" className="btn btn-outline rounded-l-none">
          Apply
        </button>
      </div>
      {message && (
        <p id={messageId} role="alert" className="mt-2 text-meta text-sale">
          {message}
        </p>
      )}
      <p className="mt-2 text-meta text-stone">
        Demo codes: SHUTO10, WELCOME200, FREESHIP
      </p>
    </form>
  );
}
