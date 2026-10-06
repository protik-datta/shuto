import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SectionHeading from "../../components/common/SectionHeading";
import ProductGallery from "../../components/product/ProductGallery";
import ProductGrid from "../../components/product/ProductGrid";
import useProductSelection from "../../hooks/useProductSelection";
import usePageMeta from "../../hooks/usePageMeta";
import { getCategoryLabel } from "../../data/categories";
import {
  getCompleteTheLook,
  getProductById,
  getRelatedProducts,
} from "../../lib/catalog";
import {
  getRecentlyViewedIds,
  recordProductView,
} from "../../lib/recentlyViewed";
import { formatPrice } from "../../utils/format";
import ProductInfo from "./ProductInfo";
import ReviewList from "./ReviewList";

export default function ProductDetail({ product }) {
  const navigate = useNavigate();
  const selection = useProductSelection(product);
  const ctaRef = useRef(null);
  const [isCtaVisible, setIsCtaVisible] = useState(true);
  const [recentlyViewed] = useState(() =>
    getRecentlyViewedIds()
      .filter((id) => id !== product.id)
      .map(getProductById)
      .filter(Boolean)
      .slice(0, 4),
  );
  const completeTheLook = getCompleteTheLook(product);
  const related = getRelatedProducts(product);

  usePageMeta({ title: product.name, description: product.description });

  useEffect(() => recordProductView(product.id), [product.id]);

  useEffect(() => {
    const target = ctaRef.current;
    if (!target || typeof IntersectionObserver === "undefined")
      return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setIsCtaVisible(entry.isIntersecting),
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const addToCart = ({ feedback } = {}) => {
    const added = selection.submit({ feedback });
    if (!added && !selection.size)
      document
        .getElementById("size-selector")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return added;
  };

  const buyNow = () => {
    if (addToCart({ feedback: "none" })) navigate("/checkout");
  };

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    {
      label: getCategoryLabel(product.category) ?? product.category,
      to: `/shop/${product.category}`,
    },
    { label: product.name },
  ];

  return (
    <div className="container-page py-6 pb-24 lg:py-8 lg:pb-8">
      <Breadcrumbs items={crumbs} />

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductInfo
            ref={ctaRef}
            product={product}
            selection={selection}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        </div>
      </div>

      {completeTheLook.length > 0 && (
        <section aria-labelledby="look-heading" className="mt-16 lg:mt-24">
          <SectionHeading title="Complete the look" />
          <h3 id="look-heading" className="sr-only">
            Pieces that go with {product.name}
          </h3>
          <ProductGrid products={completeTheLook} />
        </section>
      )}

      <div className="mt-16 lg:mt-24">
        <ReviewList product={product} />
      </div>

      <section className="mt-16 lg:mt-24">
        <SectionHeading
          title="You may also like"
          linkTo={`/shop/${product.category}`}
          linkLabel="View category"
        />
        <ProductGrid products={related} />
      </section>

      {recentlyViewed.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <SectionHeading title="Recently viewed" />
          <ProductGrid products={recentlyViewed} />
        </section>
      )}

      {!isCtaVisible && product.stock > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-line bg-paper p-3 lg:hidden">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product.name}</p>
            <p className="text-sm text-stone">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => addToCart()}
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}
