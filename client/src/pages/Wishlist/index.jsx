import EmptyState from "../../components/ui/EmptyState";
import { useWishlist } from "../../context/WishlistContext";
import usePageMeta from "../../hooks/usePageMeta";
import { getProductById } from "../../lib/catalog";
import WishlistCard from "./WishlistCard";

export default function Wishlist() {
  const { ids } = useWishlist();
  const products = ids.map(getProductById).filter(Boolean);
  usePageMeta({ title: "Wishlist", description: "The pieces you have saved." });

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-h1 font-semibold">
        Wishlist
        {products.length > 0 && (
          <span className="text-stone"> ({products.length})</span>
        )}
      </h1>
      {products.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          text="Tap the heart on any piece to keep it here for later."
          actionLabel="Shop new arrivals"
          actionTo="/shop/new-arrivals"
        />
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
          {products.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
