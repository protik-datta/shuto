import StarRating from "../../components/ui/StarRating";
import { formatDate } from "../../utils/format";

export default function ReviewList({ product }) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="border-t border-line pt-10"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id="reviews-heading" className="text-h2 font-semibold">
          Reviews
        </h2>
        <p className="flex items-center gap-2 text-sm text-stone">
          <StarRating rating={product.rating} /> {product.rating} from{" "}
          {product.reviewCount} reviews
        </p>
      </div>
      <ul className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {product.reviews.map(({ id, name, rating, date, text }) => (
          <li key={id} className="border-t border-line pt-4">
            <div className="flex items-center justify-between">
              <StarRating rating={rating} />
              <time dateTime={date} className="text-meta text-stone">
                {formatDate(date)}
              </time>
            </div>
            <p className="mt-2 text-sm">{text}</p>
            <p className="mt-2 text-meta text-stone">{name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
