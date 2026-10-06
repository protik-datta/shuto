import { DEFAULT_ACCOUNT } from "../lib/account";
import { getProductById } from "../lib/catalog";
import { calculateTotals } from "../lib/pricing";

const address = (({ name, line, city, postalCode }) => ({
  name,
  line,
  city,
  postalCode,
  country: "Bangladesh",
  phone: DEFAULT_ACCOUNT.profile.phone,
}))(DEFAULT_ACCOUNT.addresses[0]);

const buildOrder = ({
  number,
  placedAt,
  status,
  items,
  shippingMethod = "standard",
  payment,
  trackingCode,
  deliveredAt,
  couponCode,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + getProductById(item.productId).price * item.quantity,
    0,
  );
  return {
    id: `ORD-2026-${number}`,
    placedAt,
    status,
    items,
    shippingMethod,
    payment,
    address,
    trackingCode,
    deliveredAt,
    totals: calculateTotals({ subtotal, couponCode, shippingMethod }),
  };
};

export const MOCK_ORDERS = [
  buildOrder({
    number: 10361,
    placedAt: "2026-10-03",
    status: "Processing",
    payment: "bKash",
    items: [
      { productId: 7, size: "L", color: "Black", quantity: 1 },
      { productId: 1, size: "M", color: "White", quantity: 2 },
    ],
  }),
  buildOrder({
    number: 10298,
    placedAt: "2026-09-28",
    status: "Shipped",
    payment: "Cash on delivery",
    shippingMethod: "express",
    trackingCode: "SH-TRK-48215",
    items: [{ productId: 18, size: "M", color: "Navy", quantity: 1 }],
  }),
  buildOrder({
    number: 10142,
    placedAt: "2026-08-14",
    status: "Delivered",
    payment: "Card",
    couponCode: "SHUTO10",
    deliveredAt: "2026-08-17",
    trackingCode: "SH-TRK-39770",
    items: [
      { productId: 2, size: "M", color: "White", quantity: 1 },
      { productId: 10, size: "32", color: "Indigo", quantity: 1 },
      { productId: 32, size: "One size", color: "Black", quantity: 1 },
    ],
  }),
  buildOrder({
    number: 10077,
    placedAt: "2026-07-02",
    status: "Delivered",
    payment: "Cash on delivery",
    deliveredAt: "2026-07-05",
    trackingCode: "SH-TRK-31204",
    items: [{ productId: 1, size: "L", color: "Stone", quantity: 2 }],
  }),
];
