import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-meta text-stone">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map(({ label, to }, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={label} className="flex items-center gap-1">
              {isLast || !to ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-ink" : ""}
                >
                  {label}
                </span>
              ) : (
                <Link to={to} className="hover:text-ink hover:underline">
                  {label}
                </Link>
              )}
              {!isLast && <ChevronRight size={12} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
