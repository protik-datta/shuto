import { COMMERCE } from "../constants/site";

export const formatPrice = (amount) =>
  `${COMMERCE.currencySymbol}${Math.round(amount).toLocaleString("en-US")}`;

export const getDiscountPercent = (price, originalPrice) =>
  originalPrice && originalPrice > price
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

export const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
