export default function CategoryTabs({ categories, active, onChange }) {
  const tabClass = (isActive) =>
    `shrink-0 border-b-2 px-1 pb-2 text-sm transition-colors ${isActive ? "border-ink font-medium" : "border-transparent text-stone hover:text-ink"}`;

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="-mx-4 flex gap-6 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <button
        type="button"
        onClick={() => onChange("")}
        aria-pressed={!active}
        className={tabClass(!active)}
      >
        All
      </button>
      {categories.map(({ slug, label }) => (
        <button
          key={slug}
          type="button"
          onClick={() => onChange(slug)}
          aria-pressed={active === slug}
          className={tabClass(active === slug)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
