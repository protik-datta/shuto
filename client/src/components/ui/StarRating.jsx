import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14 }) {
  const filled = Math.round(rating);
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="inline-flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < filled ? "currentColor" : "none"}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
