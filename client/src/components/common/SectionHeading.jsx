import { Link } from "react-router-dom";

export default function SectionHeading({
  title,
  linkTo,
  linkLabel = "View all",
  children,
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 lg:mb-8">
      <h2 className="text-h2 font-semibold">{title}</h2>
      {children}
      {linkTo && (
        <Link
          to={linkTo}
          className="link-underline shrink-0 text-sm font-medium"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
