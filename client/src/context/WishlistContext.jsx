import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/site';
import { getProductById } from '../lib/catalog';
import { readStorage, writeStorage } from '../utils/storage';

const WishlistContext = createContext(null);

const sanitizeIds = (raw) =>
  Array.isArray(raw) ? [...new Set(raw.map(Number).filter((id) => getProductById(id)))] : [];

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => sanitizeIds(readStorage(STORAGE_KEYS.wishlist, [])));

  useEffect(() => writeStorage(STORAGE_KEYS.wishlist, ids), [ids]);

  const addToWishlist = useCallback((id) => setIds((current) => (current.includes(id) ? current : [...current, id])), []);
  const removeFromWishlist = useCallback((id) => setIds((current) => current.filter((item) => item !== id)), []);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      addToWishlist,
      removeFromWishlist,
      isWishlisted: (id) => ids.includes(id),
    }),
    [ids, addToWishlist, removeFromWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
  return context;
};
