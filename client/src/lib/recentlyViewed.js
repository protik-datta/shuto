import { STORAGE_KEYS } from "../constants/site";
import { readStorage, writeStorage } from "../utils/storage";

const MAX_ITEMS = 8;

export const getRecentlyViewedIds = () => {
  const stored = readStorage(STORAGE_KEYS.recentlyViewed, []);
  return Array.isArray(stored)
    ? stored.map(Number).filter(Number.isFinite)
    : [];
};

export const recordProductView = (id) =>
  writeStorage(
    STORAGE_KEYS.recentlyViewed,
    [id, ...getRecentlyViewedIds().filter((item) => item !== id)].slice(
      0,
      MAX_ITEMS,
    ),
  );
