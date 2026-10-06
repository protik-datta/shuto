import { ArrowRight, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDialog from "../../hooks/useDialog";
import {
  clearRecentSearches,
  getRecentSearches,
  POPULAR_SEARCHES,
  saveRecentSearch,
  searchCategories,
  searchProducts,
} from "../../lib/search";
import { formatPrice } from "../../utils/format";

const termButton =
  "rounded-sm border border-line px-3 py-1.5 text-sm transition-colors hover:border-ink";

export default function SearchOverlay({ onClose }) {
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(getRecentSearches);
  useDialog(onClose, panelRef);

  const trimmed = query.trim();
  const products = searchProducts(trimmed, 6);
  const categories = searchCategories(trimmed);

  const goToResults = (term) => {
    if (!term.trim()) return;
    saveRecentSearch(term);
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    goToResults(trimmed);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecent([]);
  };

  const termList = (terms) => (
    <ul className="flex flex-wrap gap-2">
      {terms.map((term) => (
        <li key={term}>
          <button
            type="button"
            onClick={() => {
              setQuery(term);
            }}
            className={termButton}
          >
            {term}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fade-in absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        tabIndex={-1}
        className="drop-in absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto bg-paper"
      >
        <div className="container-page py-4 lg:py-6">
          <form
            onSubmit={handleSubmit}
            role="search"
            className="flex items-center gap-3 border-b border-ink pb-3"
          >
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for shirts, knitwear, trousers"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-stone"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-10 w-10 items-center justify-center"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </form>

          <div className="py-6 lg:py-8">
            {!trimmed && (
              <div className="grid gap-8 md:grid-cols-2">
                {recent.length > 0 && (
                  <section aria-labelledby="recent-heading">
                    <div className="mb-3 flex items-baseline justify-between">
                      <h2 id="recent-heading" className="text-sm font-semibold">
                        Recent searches
                      </h2>
                      <button
                        type="button"
                        onClick={handleClearRecent}
                        className="text-meta text-stone underline"
                      >
                        Clear
                      </button>
                    </div>
                    {termList(recent)}
                  </section>
                )}
                <section aria-labelledby="popular-heading">
                  <h2
                    id="popular-heading"
                    className="mb-3 text-sm font-semibold"
                  >
                    Popular right now
                  </h2>
                  {termList(POPULAR_SEARCHES)}
                </section>
              </div>
            )}

            {trimmed && products.length === 0 && categories.length === 0 && (
              <div className="py-6">
                <p className="text-lg font-medium">
                  No results for &ldquo;{trimmed}&rdquo;
                </p>
                <p className="mt-1 text-stone">
                  Check the spelling, or try a broader word like
                  &ldquo;shirt&rdquo; or &ldquo;jacket&rdquo;.
                </p>
                <div className="mt-5">{termList(POPULAR_SEARCHES)}</div>
              </div>
            )}

            {trimmed && (products.length > 0 || categories.length > 0) && (
              <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
                <section aria-labelledby="categories-heading">
                  <h2
                    id="categories-heading"
                    className="mb-3 text-sm font-semibold"
                  >
                    Categories
                  </h2>
                  {categories.length ? (
                    <ul className="space-y-2 text-sm">
                      {categories.map(({ slug, label }) => (
                        <li key={slug}>
                          <Link to={`/shop/${slug}`} className="link-underline">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-stone">No matching categories</p>
                  )}
                </section>
                <section aria-labelledby="products-heading">
                  <h2
                    id="products-heading"
                    className="mb-3 text-sm font-semibold"
                  >
                    Products
                  </h2>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
                    {products.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => saveRecentSearch(trimmed)}
                          className="block"
                        >
                          <img
                            src={product.images[0]}
                            alt=""
                            width="300"
                            height="375"
                            loading="lazy"
                            className="aspect-[4/5] w-full bg-sand object-cover"
                          />
                          <p className="mt-2 text-sm leading-snug">
                            {product.name}
                          </p>
                          <p className="text-sm text-stone">
                            {formatPrice(product.price)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium link-underline"
                  >
                    See all results <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
