import { STORAGE_KEYS } from "../constants/site";
import { MOCK_ORDERS } from "../data/mockOrders";
import { readStorage, writeStorage } from "../utils/storage";
import { getProductById } from "./catalog";

const FIRST_NEW_ORDER_NUMBER = 10482;

const isValidOrder = (order) =>
  order &&
  typeof order.id === "string" &&
  Array.isArray(order.items) &&
  order.totals &&
  order.address;

export const getPlacedOrders = () => {
  const stored = readStorage(STORAGE_KEYS.orders, []);
  return Array.isArray(stored) ? stored.filter(isValidOrder) : [];
};

export const createOrderNumber = () =>
  `ORD-2026-${FIRST_NEW_ORDER_NUMBER + getPlacedOrders().length}`;

export const saveOrder = (order) =>
  writeStorage(STORAGE_KEYS.orders, [order, ...getPlacedOrders()]);

export const getAllOrders = () =>
  [...getPlacedOrders(), ...MOCK_ORDERS].sort(
    (a, b) => b.placedAt.localeCompare(a.placedAt) || b.id.localeCompare(a.id),
  );

export const getOrderById = (id) =>
  getAllOrders().find((order) => order.id === id) ?? null;

export const getOrderLines = (order) =>
  order.items
    .map((item) => ({
      ...item,
      key: `${item.productId}:${item.size}:${item.color}`,
      product: getProductById(item.productId),
    }))
    .filter((line) => line.product);

export const ORDER_STEPS = ["Processing", "Shipped", "Delivered"];

const DELIVERY_DAYS = { standard: 4, express: 2 };

export const getEstimatedDelivery = (order) => {
  const date = new Date(`${order.placedAt}T00:00:00`);
  date.setDate(
    date.getDate() +
      (DELIVERY_DAYS[order.shippingMethod] ?? DELIVERY_DAYS.standard),
  );
  return date.toISOString().slice(0, 10);
};
