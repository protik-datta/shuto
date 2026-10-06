import { Link } from "react-router-dom";
import OrderStatusBadge from "../../components/account/OrderStatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import usePageMeta from "../../hooks/usePageMeta";
import useSimulatedLoading from "../../hooks/useSimulatedLoading";
import { getAllOrders, getOrderLines } from "../../lib/orders";
import { formatDate, formatPrice } from "../../utils/format";
import AccountLayout from "./AccountLayout";

export function OrdersSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading orders"
      className="animate-pulse space-y-4"
    >
      {[0, 1, 2].map((key) => (
        <div key={key} className="h-28 bg-sand" />
      ))}
    </div>
  );
}

export default function Orders() {
  const isLoading = useSimulatedLoading("orders");
  const orders = isLoading ? [] : getAllOrders();
  usePageMeta({ title: "Orders", description: "Your order history." });

  return (
    <AccountLayout>
      <h2 className="text-h2 font-semibold">Orders</h2>
      <div className="mt-5">
        {isLoading && <OrdersSkeleton />}
        {!isLoading && orders.length === 0 && (
          <EmptyState
            title="No orders yet"
            text="When you place an order it will show up here."
            actionLabel="Start shopping"
            actionTo="/shop"
          />
        )}
        {!isLoading && orders.length > 0 && (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border border-line bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-meta text-stone">
                      Placed {formatDate(order.placedAt)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <ul className="flex gap-2">
                    {getOrderLines(order)
                      .slice(0, 4)
                      .map(({ key, product }) => (
                        <li key={key}>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            width="96"
                            height="120"
                            loading="lazy"
                            className="aspect-[4/5] w-12 bg-sand object-cover"
                          />
                        </li>
                      ))}
                  </ul>
                  <div className="text-right text-sm">
                    <p className="font-medium">
                      {formatPrice(order.totals.total)}
                    </p>
                    <Link
                      to={`/account/orders/${order.id}`}
                      className="link-underline"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AccountLayout>
  );
}
