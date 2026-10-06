import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { COMMERCE, STORAGE_KEYS } from '../constants/site';
import { getProductById, isValidVariant } from '../lib/catalog';
import { COUPONS, calculateTotals, normalizeCode, validateCoupon } from '../lib/pricing';
import { readStorage, writeStorage } from '../utils/storage';

export const getCartKey = (productId, size, color) => `${productId}:${size}:${color}`;

const clampQuantity = (product, quantity) =>
  Math.max(1, Math.min(COMMERCE.maxQuantityPerItem, product.stock, Math.floor(Number(quantity)) || 1));

const sanitizeLines = (raw, keepQuantity) => {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    const product = getProductById(entry?.productId);
    if (!isValidVariant(product, entry.size, entry.color)) return [];
    if (keepQuantity && product.stock === 0) return [];
    const line = { productId: product.id, size: entry.size, color: entry.color };
    return [keepQuantity ? { ...line, quantity: clampQuantity(product, entry.quantity) } : line];
  });
};

const sanitizeMeta = (raw) => ({
  couponCode: typeof raw?.couponCode === 'string' && COUPONS[raw.couponCode] ? raw.couponCode : '',
  shippingMethod: raw?.shippingMethod === 'express' ? 'express' : 'standard',
});

const matches = (item, key) => getCartKey(item.productId, item.size, item.color) === key;

const reducer = (items, action) => {
  switch (action.type) {
    case 'add': {
      const { productId, size, color, quantity } = action.payload;
      const product = getProductById(productId);
      const key = getCartKey(productId, size, color);
      const existing = items.find((item) => matches(item, key));
      if (!existing) return [...items, { productId, size, color, quantity: clampQuantity(product, quantity) }];
      return items.map((item) => (item === existing ? { ...item, quantity: clampQuantity(product, item.quantity + quantity) } : item));
    }
    case 'remove':
      return items.filter((item) => !matches(item, action.key));
    case 'update':
      return items.map((item) => (matches(item, action.key) ? { ...item, quantity: clampQuantity(getProductById(item.productId), action.quantity) } : item));
    case 'clear':
      return [];
    default:
      return items;
  }
};

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, null, () => sanitizeLines(readStorage(STORAGE_KEYS.cart, []), true));
  const [savedItems, setSavedItems] = useState(() => sanitizeLines(readStorage(STORAGE_KEYS.savedForLater, []), false));
  const [meta, setMeta] = useState(() => sanitizeMeta(readStorage(STORAGE_KEYS.cartMeta, {})));
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => writeStorage(STORAGE_KEYS.cart, items), [items]);
  useEffect(() => writeStorage(STORAGE_KEYS.savedForLater, savedItems), [savedItems]);
  useEffect(() => writeStorage(STORAGE_KEYS.cartMeta, meta), [meta]);

  const addToCart = useCallback((product, { size, color, quantity = 1 }) => {
    if (!isValidVariant(product, size, color) || product.stock === 0) return false;
    dispatch({ type: 'add', payload: { productId: product.id, size, color, quantity } });
    return true;
  }, []);
  const removeFromCart = useCallback((key) => dispatch({ type: 'remove', key }), []);
  const updateQuantity = useCallback((key, quantity) => dispatch({ type: 'update', key, quantity }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const saveForLater = useCallback(
    (key) => {
      const item = items.find((entry) => matches(entry, key));
      if (!item) return;
      dispatch({ type: 'remove', key });
      setSavedItems((current) =>
        current.some((entry) => matches(entry, key)) ? current : [...current, { productId: item.productId, size: item.size, color: item.color }],
      );
    },
    [items],
  );

  const moveToCart = useCallback(
    (key) => {
      const saved = savedItems.find((entry) => matches(entry, key));
      const product = saved && getProductById(saved.productId);
      if (!product || !addToCart(product, { size: saved.size, color: saved.color })) return false;
      setSavedItems((current) => current.filter((entry) => !matches(entry, key)));
      return true;
    },
    [savedItems, addToCart],
  );

  const removeSaved = useCallback((key) => setSavedItems((current) => current.filter((entry) => !matches(entry, key))), []);

  const setShippingMethod = useCallback((method) => setMeta((current) => ({ ...current, shippingMethod: method })), []);
  const removeCoupon = useCallback(() => setMeta((current) => ({ ...current, couponCode: '' })), []);

  const value = useMemo(() => {
    const detailedItems = items.map((item) => {
      const product = getProductById(item.productId);
      return { ...item, key: getCartKey(item.productId, item.size, item.color), product, lineTotal: product.price * item.quantity };
    });
    const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const totals = calculateTotals({ subtotal, couponCode: meta.couponCode, shippingMethod: meta.shippingMethod });

    const applyCoupon = (code) => {
      const result = validateCoupon(code, subtotal);
      if (result.valid) setMeta((current) => ({ ...current, couponCode: normalizeCode(code) }));
      return result;
    };

    return {
      items: detailedItems,
      savedItems: savedItems.map((item) => ({ ...item, key: getCartKey(item.productId, item.size, item.color), product: getProductById(item.productId) })),
      totals,
      couponCode: meta.couponCode,
      shippingMethod: meta.shippingMethod,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      saveForLater,
      moveToCart,
      removeSaved,
      applyCoupon,
      removeCoupon,
      setShippingMethod,
      getCartTotal: () => totals.total,
      getCartCount: () => detailedItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [items, savedItems, meta, isCartOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart, saveForLater, moveToCart, removeSaved, removeCoupon, setShippingMethod]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
