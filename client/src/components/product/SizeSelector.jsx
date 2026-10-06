export default function SizeSelector({ sizes, value, onChange, error }) {
  if (sizes.length === 1) return null;
  return (
    <fieldset id="size-selector" className="min-w-0">
      <legend className="mb-2 text-sm font-medium">
        Size{value && <span className="font-normal text-stone">: {value}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={value === size}
            className={`h-11 min-w-12 border px-3 text-sm transition-colors ${value === size ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink"}`}
          >
            {size}
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-sale">
          {error}
        </p>
      )}
    </fieldset>
  );
}
