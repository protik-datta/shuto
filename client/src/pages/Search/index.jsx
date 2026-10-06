import { Search as SearchIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import ProductGrid from "../../components/product/ProductGrid";
import SortDropdown from "../../components/shop/SortDropdown";
import EmptyState from "../../components/ui/EmptyState";
import usePageMeta from "../../hooks/usePageMeta";
import { sortProducts } from "../../lib/listing";
import {
  POPULAR_SEARCHES,
  saveRecentSearch,
  searchProducts,
} from "../../lib/search";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const sort = params.get("sort") ?? "featured";
  const results = useMemo(
    () => sortProducts(searchProducts(query), sort),
    [query, sort],
  );

  usePageMeta({
    title: query ? `Search: ${query}` : "Search",
    description: "Search the Shuto range.",
  });

  useEffect(() => {
    if (query) saveRecentSearch(query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("q").toString().trim();
    setParams(value ? { q: value } : {});
  };

  const popular = (
    <ul className="mt-4 flex flex-wrap justify-center gap-2">
      {POPULAR_SEARCHES.map((term) => (
        <li key={term}>
          <Link
            to={`/search?q=${encodeURIComponent(term)}`}
            className="border border-line px-3 py-1.5 text-sm hover:border-ink"
          >
            {term}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container-page py-6 lg:py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <h1 className="mt-4 text-h1 font-semibold">
        {query ? `Results for \u201c${query}\u201d` : "Search"}
      </h1>

      <form
        key={query}
        onSubmit={handleSubmit}
        role="search"
        className="mt-5 flex max-w-xl"
      >
        <input
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search the range"
          aria-label="Search products"
          className="input rounded-r-none border-r-0"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-l-none"
          aria-label="Search"
        >
          <SearchIcon size={18} aria-hidden="true" />
        </button>
      </form>

      {!query && (
        <div className="py-16 text-center">
          <p className="text-stone">Try a product, material or category.</p>
          {popular}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="py-8">
          <EmptyState
            title={`No results for \u201c${query}\u201d`}
            text="Check the spelling, or try a broader word like shirt or jacket."
            actionLabel="Shop all"
            actionTo="/shop"
          />
          <div className="-mt-12 pb-8 text-center">{popular}</div>
        </div>
      )}

      {query && results.length > 0 && (
        <>
          <div className="flex items-center justify-between py-5">
            <p className="text-sm text-stone" aria-live="polite">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <SortDropdown
              value={sort}
              onChange={(value) =>
                setParams({
                  q: query,
                  ...(value !== "featured" && { sort: value }),
                })
              }
            />
          </div>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}
