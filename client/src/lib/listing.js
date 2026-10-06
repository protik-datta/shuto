import { CATEGORIES, DEPARTMENTS } from "../data/categories";
import { COLLECTIONS } from "../data/collections";
import { PRODUCTS } from "../data/products";
import { formatPrice } from "../utils/format";

const SPECIAL_LISTINGS = {
  "new-arrivals": {
    title: "New arrivals",
    description: "The latest pieces from Shuto.",
    test: (p) => p.isNew,
  },
  "best-sellers": {
    title: "Best sellers",
    description: "The pieces our customers reorder most.",
    test: (p) => p.isBestSeller,
  },
  sale: {
    title: "Sale",
    description: "Selected styles at reduced prices while stock lasts.",
    test: (p) => p.originalPrice > p.price,
  },
  collections: {
    title: "Collections",
    description: "Seasonal ranges, designed to be worn together.",
    test: () => true,
  },
};

export const resolveListing = (slug) => {
  if (!slug)
    return {
      title: "Shop all",
      description: "The full Shuto range.",
      products: PRODUCTS,
      showTabs: true,
      showCollectionFilter: true,
    };

  const special = SPECIAL_LISTINGS[slug];
  if (special)
    return {
      title: special.title,
      description: special.description,
      products: PRODUCTS.filter(special.test),
      showTabs: true,
      showCollectionFilter: true,
    };

  const department = DEPARTMENTS.find((item) => item.slug === slug);
  if (department) {
    return {
      title: department.label,
      description: `${department.label}'s clothing, from everyday tees to winter outerwear.`,
      products: PRODUCTS.filter(
        (p) => p.department === slug || p.department === "unisex",
      ),
      showTabs: true,
      showCollectionFilter: true,
    };
  }

  const category = CATEGORIES.find((item) => item.slug === slug);
  if (category) {
    return {
      title: category.label,
      description: `Shop ${category.label.toLowerCase()} from Shuto.`,
      products: PRODUCTS.filter((p) => p.category === slug),
      showTabs: false,
      showCollectionFilter: true,
    };
  }

  const collection = COLLECTIONS.find((item) => item.slug === slug);
  if (collection) {
    return {
      title: collection.label,
      description: collection.blurb,
      products: PRODUCTS.filter((p) => p.collection === slug),
      showTabs: true,
      showCollectionFilter: false,
    };
  }

  return null;
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

const SORTERS = {
  featured: (a, b) =>
    Number(b.isFeatured) - Number(a.isFeatured) || a.id - b.id,
  newest: (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "best-selling": (a, b) =>
    Number(b.isBestSeller) - Number(a.isBestSeller) ||
    b.reviewCount - a.reviewCount,
};

export const sortProducts = (products, sort) =>
  [...products].sort(SORTERS[sort] ?? SORTERS.featured);

export const PRICE_RANGES = [
  {
    id: "under-2000",
    label: `Under ${formatPrice(2000)}`,
    test: (price) => price < 2000,
  },
  {
    id: "2000-3999",
    label: `${formatPrice(2000)} to ${formatPrice(3999)}`,
    test: (price) => price >= 2000 && price < 4000,
  },
  {
    id: "4000-6999",
    label: `${formatPrice(4000)} to ${formatPrice(6999)}`,
    test: (price) => price >= 4000 && price < 7000,
  },
  {
    id: "7000-plus",
    label: `${formatPrice(7000)} and above`,
    test: (price) => price >= 7000,
  },
];

export const applyFilters = (
  products,
  { category, sizes, colors, prices, collections, inStock },
) =>
  products.filter((product) => {
    if (category && product.category !== category) return false;
    if (sizes.length && !sizes.some((size) => product.sizes.includes(size)))
      return false;
    if (
      colors.length &&
      !colors.some((color) =>
        product.colors.some((entry) => entry.name === color),
      )
    )
      return false;
    if (
      prices.length &&
      !PRICE_RANGES.some(
        (range) => prices.includes(range.id) && range.test(product.price),
      )
    )
      return false;
    if (collections.length && !collections.includes(product.collection))
      return false;
    if (inStock && product.stock === 0) return false;
    return true;
  });

const SIZE_ORDER = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "28",
  "30",
  "32",
  "34",
  "36",
  "One size",
];

export const getFacets = (products) => {
  const sizes = new Set();
  const colors = new Map();
  const collections = new Set();
  const categories = new Set();
  products.forEach((product) => {
    product.sizes.forEach((size) => sizes.add(size));
    product.colors.forEach(({ name, hex }) => colors.set(name, hex));
    collections.add(product.collection);
    categories.add(product.category);
  });
  return {
    sizes: SIZE_ORDER.filter((size) => sizes.has(size)),
    colors: [...colors]
      .map(([name, hex]) => ({ name, hex }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    collections: COLLECTIONS.filter(({ slug }) => collections.has(slug)),
    categories: CATEGORIES.filter(({ slug }) => categories.has(slug)),
  };
};

export const getActiveFilterPills = ({
  sizes,
  colors,
  prices,
  collections,
  inStock,
}) => [
  ...sizes.map((value) => ({ key: "size", value, label: `Size ${value}` })),
  ...colors.map((value) => ({ key: "color", value, label: value })),
  ...prices.map((value) => ({
    key: "price",
    value,
    label: PRICE_RANGES.find((range) => range.id === value)?.label ?? value,
  })),
  ...collections.map((value) => ({
    key: "collection",
    value,
    label: COLLECTIONS.find((item) => item.slug === value)?.label ?? value,
  })),
  ...(inStock ? [{ key: "stock", value: "in", label: "In stock" }] : []),
];
