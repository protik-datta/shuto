export const CATEGORIES = [
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "shirts", label: "Shirts" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "sweatshirts", label: "Sweatshirts" },
  { slug: "jackets", label: "Jackets" },
  { slug: "jeans", label: "Jeans" },
  { slug: "trousers", label: "Trousers" },
  { slug: "dresses", label: "Dresses" },
  { slug: "knitwear", label: "Knitwear" },
  { slug: "outerwear", label: "Outerwear" },
  { slug: "accessories", label: "Accessories" },
];

export const DEPARTMENTS = [
  { slug: "women", label: "Women" },
  { slug: "men", label: "Men" },
];

export const SPECIAL_LISTINGS = [
  { slug: "new-arrivals", label: "New Arrivals" },
  { slug: "best-sellers", label: "Best Sellers" },
  { slug: "collections", label: "Collections" },
  { slug: "sale", label: "Sale" },
];

export const getCategoryLabel = (slug) =>
  [...CATEGORIES, ...DEPARTMENTS, ...SPECIAL_LISTINGS].find(
    (item) => item.slug === slug,
  )?.label ?? null;
