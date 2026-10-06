import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import NotFoundView from "../../components/common/NotFoundView";
import ProductGrid from "../../components/product/ProductGrid";
import ProductGridSkeleton from "../../components/product/ProductGridSkeleton";
import CategoryTabs from "../../components/shop/CategoryTabs";
import FilterDrawer from "../../components/shop/FilterDrawer";
import SortDropdown from "../../components/shop/SortDropdown";
import EmptyState from "../../components/ui/EmptyState";
import useListingParams from "../../hooks/useListingParams";
import usePageMeta from "../../hooks/usePageMeta";
import useSimulatedLoading from "../../hooks/useSimulatedLoading";
import {
  applyFilters,
  getActiveFilterPills,
  getFacets,
  resolveListing,
  sortProducts,
} from "../../lib/listing";

export default function Shop() {
  const { category: slug } = useParams();
  const listing = useMemo(() => resolveListing(slug), [slug]);
  const { filters, toggleValue, setValue, clearFilters } = useListingParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isLoading = useSimulatedLoading(slug ?? "all");

  usePageMeta({
    title: listing?.title ?? "Page not found",
    description: listing?.description ?? "This page does not exist.",
  });

  const facets = useMemo(
    () => (listing ? getFacets(listing.products) : null),
    [listing],
  );
  const categoryFiltered = useMemo(
    () => (listing ? applyFilters(listing.products, filters) : []),
    [listing, filters],
  );
  const products = useMemo(
    () => sortProducts(categoryFiltered, filters.sort),
    [categoryFiltered, filters.sort],
  );
  const closeFilters = useCallback(() => setIsFilterOpen(false), []);

  if (!listing) {
    return (
      <NotFoundView
        title="We could not find that collection"
        text="Check the link, or browse everything we make."
      />
    );
  }

  const pills = getActiveFilterPills(filters);
  const crumbs = [
    { label: "Home", to: "/" },
    ...(slug ? [{ label: "Shop", to: "/shop" }] : []),
    { label: listing.title },
  ];

  return (
    <div className="container-page py-6 lg:py-8">
      <Breadcrumbs items={crumbs} />

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h1 className="text-h1 font-semibold">{listing.title}</h1>
        <p className="text-sm text-stone" aria-live="polite">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>
      <p className="mt-2 max-w-xl text-stone">{listing.description}</p>

      {listing.showTabs && (
        <div className="mt-6 border-b border-line">
          <CategoryTabs
            categories={facets.categories}
            active={filters.category}
            onChange={(value) => setValue("category", value)}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 py-4">
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="btn btn-outline"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filter{pills.length > 0 && ` (${pills.length})`}
        </button>
        <SortDropdown
          value={filters.sort}
          onChange={(value) =>
            setValue("sort", value === "featured" ? "" : value)
          }
        />
      </div>

      {pills.length > 0 && (
        <ul
          className="mb-6 flex flex-wrap items-center gap-2"
          aria-label="Active filters"
        >
          {pills.map(({ key, value, label }) => (
            <li key={`${key}-${value}`}>
              <button
                type="button"
                onClick={() => toggleValue(key, value)}
                aria-label={`Remove filter ${label}`}
                className="flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-sm hover:border-ink"
              >
                {label}
                <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={clearFilters}
              className="link-underline px-2 text-sm"
            >
              Clear all
            </button>
          </li>
        </ul>
      )}

      {isLoading && <ProductGridSkeleton />}
      {!isLoading && products.length > 0 && <ProductGrid products={products} />}
      {!isLoading && products.length === 0 && (
        <EmptyState
          title="Nothing matches those filters"
          text="Try removing a filter or two to see more of the range."
          actionLabel="Clear filters"
          onAction={() => {
            clearFilters();
            setValue("category", "");
          }}
        />
      )}

      {isFilterOpen && (
        <FilterDrawer
          facets={facets}
          filters={filters}
          showCollections={listing.showCollectionFilter}
          resultCount={products.length}
          onToggle={toggleValue}
          onClear={clearFilters}
          onClose={closeFilters}
        />
      )}
    </div>
  );
}
