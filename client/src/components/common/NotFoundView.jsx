import { Link } from "react-router-dom";

export default function NotFoundView({
  title = "Page not found",
  text = "The page you are looking for may have moved or no longer exists.",
}) {
  return (
    <div className="container-page flex min-h-[55vh] flex-col items-start justify-center py-20">
      <h1 className="text-h1 font-semibold">{title}</h1>
      <p className="mt-3 max-w-md text-stone">{text}</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn btn-outline">
          Shop all
        </Link>
      </div>
    </div>
  );
}
