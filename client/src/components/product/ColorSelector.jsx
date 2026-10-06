export default function ColorSelector({ colors, value, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-sm font-medium">
        Colour<span className="font-normal text-stone">: {value}</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {colors.map(({ name, hex }) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            aria-pressed={value === name}
            aria-label={name}
            title={name}
            className={`h-8 w-8 rounded-full border border-line ${value === name ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : "hover:ring-1 hover:ring-stone hover:ring-offset-2 hover:ring-offset-paper"}`}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>
    </fieldset>
  );
}
