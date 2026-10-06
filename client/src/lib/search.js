import { STORAGE_KEYS } from "../constants/site";
import { CATEGORIES } from "../data/categories";
import { PRODUCTS } from "../data/products";
import { readStorage, writeStorage } from "../utils/storage";

export const POPULAR_SEARCHES = [
  "Linen shirt",
  "Hoodie",
  "Wide-leg jean",
  "Overshirt",
  "Knit",
];
const MAX_RECENT = 5;

const normalize = (text) => text.toLowerCase().trim();

export const searchProducts = (query, limit = Infinity) => {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PRODUCTS.map((product) => {
    const name = normalize(product.name);
    const haystack = `${name} ${normalize(product.material)} ${product.tags.join(" ")}`;
    if (!terms.every((term) => haystack.includes(term))) return null;
    return {
      product,
      score: terms.reduce(
        (sum, term) => sum + (name.includes(term) ? 2 : 1),
        0,
      ),
    };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product)
    .slice(0, limit);
};

export const searchCategories = (query) => {
  const term = normalize(query);
  return term
    ? CATEGORIES.filter((category) =>
        category.label.toLowerCase().includes(term),
      )
    : [];
};

export const getRecentSearches = () => {
  const stored = readStorage(STORAGE_KEYS.recentSearches, []);
  return Array.isArray(stored)
    ? stored.filter((item) => typeof item === "string")
    : [];
};

export const saveRecentSearch = (term) => {
  const clean = term.trim();
  if (!clean) return;
  const next = [
    clean,
    ...getRecentSearches().filter(
      (item) => item.toLowerCase() !== clean.toLowerCase(),
    ),
  ];
  writeStorage(STORAGE_KEYS.recentSearches, next.slice(0, MAX_RECENT));
};

export const clearRecentSearches = () =>
  writeStorage(STORAGE_KEYS.recentSearches, []);
