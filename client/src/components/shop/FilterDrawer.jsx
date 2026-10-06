import { ChevronDown, X } from "lucide-react";
import { PRICE_RANGES } from "../../lib/listing";
import Drawer from "../ui/Drawer";

function FilterGroup({ title, children, defaultOpen = true }) {
  return (
    <details open={defaultOpen} className="group border-b border-line py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={18}
          className="transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  );
}

function CheckRow({ checked, onChange, label, swatch }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-ink"
      />
      {swatch && (
        <span
          className="h-4 w-4 rounded-full border border-line"
          style={{ backgroundColor: swatch }}
          aria-hidden="true"
        />
      )}
      {label}
    </label>
  );
}

export default function FilterDrawer({
  facets,
  filters,
  showCollections,
  resultCount,
  onToggle,
  onClear,
  onClose,
}) {
  const hasActive =
    filters.sizes.length ||
    filters.colors.length ||
    filters.prices.length ||
    filters.collections.length ||
    filters.inStock;

  return (
    <Drawer label="Filters" onClose={onClose} widthClass="max-w-sm">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="flex h-10 w-10 items-center justify-center"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <FilterGroup title="Size">
          <div className="flex flex-wrap gap-2">
            {facets.sizes.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onToggle("size", size)}
                  aria-pressed={active}
                  className={`h-10 min-w-12 border px-3 text-sm transition-colors ${active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup title="Colour">
          <div className="grid grid-cols-2 gap-x-4">
            {facets.colors.map(({ name, hex }) => (
              <CheckRow
                key={name}
                label={name}
                swatch={hex}
                checked={filters.colors.includes(name)}
                onChange={() => onToggle("color", name)}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Price">
          {PRICE_RANGES.map(({ id, label }) => (
            <CheckRow
              key={id}
              label={label}
              checked={filters.prices.includes(id)}
              onChange={() => onToggle("price", id)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Availability" defaultOpen={false}>
          <CheckRow
            label="In stock only"
            checked={filters.inStock}
            onChange={() => onToggle("stock", "in")}
          />
        </FilterGroup>

        {showCollections && facets.collections.length > 0 && (
          <FilterGroup title="Collection" defaultOpen={false}>
            {facets.collections.map(({ slug, label }) => (
              <CheckRow
                key={slug}
                label={label}
                checked={filters.collections.includes(slug)}
                onChange={() => onToggle("collection", slug)}
              />
            ))}
          </FilterGroup>
        )}
      </div>

      <div className="flex shrink-0 gap-3 border-t border-line p-4">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActive}
          className="btn btn-outline"
        >
          Clear all
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary flex-1"
        >
          Show {resultCount} {resultCount === 1 ? "product" : "products"}
        </button>
      </div>
    </Drawer>
  );
}
