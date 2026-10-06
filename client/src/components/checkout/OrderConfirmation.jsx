import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import OrderSummary from "../cart/OrderSummary";
import { SHIPPING_METHODS } from "../../lib/pricing";
import { getOrderLines } from "../../lib/orders";
import { formatPrice } from "../../utils/format";

export default function OrderConfirmation({ order }) {
  return (
    <div className="container-page max-w-2xl py-12 lg:py-20">
      <CheckCircle2 size={40} aria-hidden="true" />
      <h1 className="mt-4 text-h1 font-semibold">Order confirmed</h1>
      <p className="mt-2 text-charcoal">
        Thank you, {order.address.name.split(" ")[0]}. This is a frontend demo,
        so no payment was taken and no email was sent.
      </p>

      <dl className="mt-8 grid gap-4 border-y border-line py-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-stone">Order number</dt>
          <dd className="mt-1 font-semibold">{order.id}</dd>
        </div>
        <div>
          <dt className="text-stone">Delivery</dt>
          <dd className="mt-1">
            {SHIPPING_METHODS[order.shippingMethod].label},{" "}
            {SHIPPING_METHODS[order.shippingMethod].detail}
          </dd>
        </div>
        <div>
          <dt className="text-stone">Payment</dt>
          <dd className="mt-1">{order.payment}</dd>
        </div>
      </dl>

      <ul className="divide-y divide-line">
        {getOrderLines(order).map(({ key, product, size, color, quantity }) => (
          <li key={key} className="flex items-center gap-4 py-4">
            <img
              src={product.images[0]}
              alt=""
              width="120"
              height="150"
              className="aspect-[4/5] w-14 bg-sand object-cover"
            />
            <div className="flex-1 text-sm">
              <p className="font-medium">{product.name}</p>
              <p className="text-meta text-stone">
                {[size !== "One size" && size, color]
                  .filter(Boolean)
                  .join(", ")}{" "}
                &middot; Qty {quantity}
              </p>
            </div>
            <p className="text-sm">{formatPrice(product.price * quantity)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <OrderSummary totals={order.totals} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to={`/account/orders/${order.id}`} className="btn btn-primary">
          View order
        </Link>
        <Link to="/shop" className="btn btn-outline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
