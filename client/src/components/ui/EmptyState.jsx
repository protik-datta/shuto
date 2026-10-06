import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  text,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <h2 className="text-h2 font-semibold">{title}</h2>
      {text && <p className="mt-2 text-stone">{text}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary mt-6">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary mt-6"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
