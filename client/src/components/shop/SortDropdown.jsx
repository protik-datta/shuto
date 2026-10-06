import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "../../lib/listing";

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="relative inline-flex items-center text-sm">
      <span className="sr-only">Sort by</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 cursor-pointer appearance-none rounded-sm border border-line bg-white pl-3 pr-9 hover:border-stone"
      >
        {SORT_OPTIONS.map(({ value: optionValue, label }) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3"
        aria-hidden="true"
      />
    </label>
  );
}
