import { COMMERCE } from "../../constants/site";
import { formatPrice } from "../../utils/format";

export default function FreeShippingProgress({ subtotal, remaining }) {
  const reached = remaining === 0;
  const percent = Math.min(
    100,
    Math.round((subtotal / COMMERCE.freeShippingThreshold) * 100),
  );
  return (
    <div>
      <p className="text-sm">
        {reached
          ? "You have free standard delivery."
          : `Add ${formatPrice(remaining)} more for free delivery.`}
      </p>
      <div
        className="mt-2 h-1 bg-line"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress to free delivery"
      >
        <div
          className="h-full bg-ink transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
