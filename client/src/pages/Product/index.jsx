import { useParams } from "react-router-dom";
import NotFoundView from "../../components/common/NotFoundView";
import useSimulatedLoading from "../../hooks/useSimulatedLoading";
import { getProductBySlug } from "../../lib/catalog";
import ProductDetail from "./ProductDetail";

function ProductPageSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading product"
      className="container-page grid animate-pulse gap-8 py-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14"
    >
      <div className="aspect-[4/5] bg-sand" />
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-sand" />
        <div className="h-5 w-1/4 bg-sand" />
        <div className="h-20 bg-sand" />
        <div className="h-11 bg-sand" />
        <div className="h-12 bg-sand" />
      </div>
    </div>
  );
}

export default function Product() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const isLoading = useSimulatedLoading(slug);

  if (!product)
    return (
      <NotFoundView
        title="We could not find that product"
        text="It may have been removed or the link may be wrong."
      />
    );
  if (isLoading) return <ProductPageSkeleton />;
  return <ProductDetail key={product.id} product={product} />;
}
