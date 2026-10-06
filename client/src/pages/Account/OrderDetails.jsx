import { Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import OrderStatusBadge from "../../components/account/OrderStatusBadge";
import OrderSummary from "../../components/cart/OrderSummary";
import NotFoundView from "../../components/common/NotFoundView";
import usePageMeta from "../../hooks/usePageMeta";
import useSimulatedLoading from "../../hooks/useSimulatedLoading";
import {
  ORDER_STEPS,
  getEstimatedDelivery,
  getOrderById,
  getOrderLines,
} from "../../lib/orders";
import { SHIPPING_METHODS } from "../../lib/pricing";
import { formatDate, formatPrice } from "../../utils/format";
import AccountLayout from "./AccountLayout";
import { OrdersSkeleton } from "./Orders";

export default function OrderDetails() {
  const { id } = useParams();
  const order = getOrderById(id);
  const isLoading = useSimulatedLoading(id);
  usePageMeta({
    title: order ? `Order ${order.id}` : "Order not found",
    description: "Order status and delivery details.",
  });

  if (!order)
    return (
      <NotFoundView
        title="We could not find that order"
        text="Check the order number, or look through your order history."
      />
    );

  const currentStep = ORDER_STEPS.indexOf(order.status);
  const method =
    SHIPPING_METHODS[order.shippingMethod] ?? SHIPPING_METHODS.standard;

  return (
    <AccountLayout>
      <Link to="/account/orders" className="link-underline text-sm">
        All orders
      </Link>
      {isLoading ? (
        <div className="mt-5">
          <OrdersSkeleton />
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-h2 font-semibold">{order.id}</h2>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-stone">
            Placed {formatDate(order.placedAt)}
          </p>

          <ol
            aria-label="Order progress"
            className="mt-6 grid grid-cols-3 gap-2 text-sm"
          >
            {ORDER_STEPS.map((step, index) => (
              <li
                key={step}
                aria-current={index === currentStep ? "step" : undefined}
                className={index <= currentStep ? "font-medium" : "text-stone"}
              >
                <span
                  className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full border ${index <= currentStep ? "border-ink bg-ink text-paper" : "border-line"}`}
                >
                  {index <= currentStep ? (
                    <Check size={14} aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {getOrderLines(order).map(
              ({ key, product, size, color, quantity }) => (
                <li key={key} className="flex items-center gap-4 py-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="w-16 shrink-0 bg-sand"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width="128"
                      height="160"
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-meta text-stone">
                      {[size !== "One size" && `Size ${size}`, color]
                        .filter(Boolean)
                        .join(", ")}{" "}
                      &middot; Qty {quantity}
                    </p>
                  </div>
                  <p className="text-sm">
                    {formatPrice(product.price * quantity)}
                  </p>
                </li>
              ),
            )}
          </ul>

          <div className="mt-8 grid gap-8 text-sm md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Delivery</h3>
              <p>{order.address.name}</p>
              <p className="text-charcoal">
                {order.address.line}, {order.address.city}{" "}
                {order.address.postalCode}, {order.address.country}
              </p>
              <p className="mt-3">
                {method.label} delivery, {method.detail}
              </p>
              <p className="text-charcoal">
                {order.status === "Delivered"
                  ? `Delivered ${formatDate(order.deliveredAt)}`
                  : `Estimated ${formatDate(getEstimatedDelivery(order))}`}
              </p>
              {order.trackingCode && (
                <p className="text-charcoal">
                  Tracking code {order.trackingCode}
                </p>
              )}
              <p className="mt-3 text-charcoal">Payment: {order.payment}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Summary</h3>
              <OrderSummary totals={order.totals} />
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
