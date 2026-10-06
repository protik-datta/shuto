import { formatPrice } from "../../utils/format";

export default function OrderSummary({ totals }) {
  const row = "flex justify-between";
  return (
    <dl className="space-y-2 text-sm">
      <div className={row}>
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className={`${row} text-sale`}>
          <dt>Discount</dt>
          <dd>-{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div className={row}>
        <dt>Shipping</dt>
        <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
      </div>
      <div
        className={`${row} border-t border-line pt-3 text-base font-semibold`}
      >
        <dt>Total</dt>
        <dd>{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}
