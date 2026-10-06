import { PRODUCTS } from "../data/products.js";

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));
const productsBySlug = new Map(
  PRODUCTS.map((product) => [product.slug, product]),
);

export const getProductById = (id) => productsById.get(Number(id)) ?? null;
export const getProductBySlug = (slug) => productsBySlug.get(slug) ?? null;

export const isValidVariant = (product, size, color) =>
  Boolean(product) &&
  product.sizes.includes(size) &&
  product.colors.some((entry) => entry.name === color);

export const getNewArrivals = (limit) =>
  PRODUCTS.filter((product) => product.isNew).slice(0, limit);
export const getBestSellers = (limit) =>
  PRODUCTS.filter((product) => product.isBestSeller).slice(0, limit);

const COMPLEMENTS = {
  "t-shirts": ["trousers", "jeans", "jackets", "accessories"],
  shirts: ["trousers", "jeans", "accessories"],
  hoodies: ["jeans", "trousers", "accessories"],
  sweatshirts: ["jeans", "trousers", "accessories"],
  knitwear: ["trousers", "jeans", "accessories"],
  jackets: ["t-shirts", "trousers", "jeans"],
  outerwear: ["knitwear", "trousers", "jeans"],
  jeans: ["t-shirts", "shirts", "knitwear", "jackets"],
  trousers: ["shirts", "t-shirts", "knitwear", "jackets"],
  dresses: ["jackets", "outerwear", "accessories"],
  accessories: ["t-shirts", "shirts", "knitwear"],
};

const fitsDepartment = (candidate, product) =>
  candidate.department === product.department ||
  candidate.department === "unisex" ||
  product.department === "unisex";

export const getRelatedProducts = (product, limit = 4) => {
  const others = PRODUCTS.filter(
    (candidate) =>
      candidate.id !== product.id && fitsDepartment(candidate, product),
  );
  const sameCategory = others.filter(
    (candidate) => candidate.category === product.category,
  );
  const rest = others.filter(
    (candidate) => candidate.category !== product.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
};

export const getCompleteTheLook = (product, limit = 4) => {
  const categories = COMPLEMENTS[product.category] ?? [];
  return PRODUCTS.filter(
    (candidate) =>
      categories.includes(candidate.category) &&
      fitsDepartment(candidate, product) &&
      candidate.stock > 0,
  )
    .sort(
      (a, b) =>
        categories.indexOf(a.category) - categories.indexOf(b.category) ||
        Number(b.isFeatured) - Number(a.isFeatured),
    )
    .slice(0, limit);
};
