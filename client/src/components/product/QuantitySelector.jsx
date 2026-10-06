import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  value,
  max,
  onChange,
  label = "Quantity",
  compact = false,
}) {
  const buttonClass = `flex ${compact ? "h-9 w-9" : "h-11 w-11"} items-center justify-center hover:bg-sand disabled:opacity-40 disabled:hover:bg-transparent`;
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center border border-line bg-white"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className={buttonClass}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className={`${compact ? "w-8" : "w-10"} text-center text-sm`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={buttonClass}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
