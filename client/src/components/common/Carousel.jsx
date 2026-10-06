import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Carousel({ label, children, controlsClassName = "" }) {
  const trackRef = useRef(null);
  const scrollByPage = (direction) => {
    const track = trackRef.current;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const buttonClass =
    "hidden h-9 w-9 items-center justify-center border border-line hover:border-ink md:flex";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        className={`mb-4 hidden justify-end gap-2 md:flex ${controlsClassName}`}
      >
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous products"
          className={buttonClass}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next products"
          className={buttonClass}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:gap-4 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
