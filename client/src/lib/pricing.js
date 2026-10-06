import { COMMERCE } from "../constants/site";
import { formatPrice } from "../utils/format";

export const COUPONS = {
  SHUTO10: {
    type: "percent",
    value: 10,
    minSubtotal: 0,
    label: "10% off your order",
  },
  WELCOME200: {
    type: "fixed",
    value: 200,
    minSubtotal: 2000,
    label: `${formatPrice(200)} off orders over ${formatPrice(2000)}`,
  },
  FREESHIP: {
    type: "shipping",
    minSubtotal: 0,
    label: "Free standard delivery",
  },
};

export const SHIPPING_METHODS = {
  standard: {
    label: "Standard",
    detail: "3 to 5 days",
    fee: COMMERCE.standardShippingFee,
  },
  express: {
    label: "Express",
    detail: "1 to 2 days",
    fee: COMMERCE.expressShippingFee,
  },
};

export const normalizeCode = (code) => code.trim().toUpperCase();

export const validateCoupon = (code, subtotal) => {
  const key = normalizeCode(code);
  if (!key) return { valid: false, message: "Enter a promo code." };
  const coupon = COUPONS[key];
  if (!coupon) return { valid: false, message: "That code is not valid." };
  if (subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      message: `This code needs a subtotal of ${formatPrice(coupon.minSubtotal)} or more.`,
    };
  }
  return { valid: true, code: key, coupon };
};

export const calculateTotals = ({
  subtotal,
  couponCode = "",
  shippingMethod = "standard",
}) => {
  const check = couponCode
    ? validateCoupon(couponCode, subtotal)
    : { valid: false };
  const coupon = check.valid ? check.coupon : null;

  let discount = 0;
  if (coupon?.type === "percent")
    discount = Math.round((subtotal * coupon.value) / 100);
  if (coupon?.type === "fixed") discount = Math.min(coupon.value, subtotal);

  const qualifiesForFreeShipping =
    subtotal >= COMMERCE.freeShippingThreshold || coupon?.type === "shipping";
  const method = SHIPPING_METHODS[shippingMethod] ?? SHIPPING_METHODS.standard;
  const shipping =
    subtotal === 0
      ? 0
      : shippingMethod === "standard" && qualifiesForFreeShipping
        ? 0
        : method.fee;

  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    couponActive: Boolean(coupon),
    freeShippingRemaining: Math.max(
      0,
      COMMERCE.freeShippingThreshold - subtotal,
    ),
  };
};
