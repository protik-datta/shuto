import { useCallback, useState } from "react";
import Lightbox from "./Lightbox";

export default function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setIsLightboxOpen(false), []);

  const handleMouseMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((event.clientX - box.left) / box.width) * 100}% ${((event.clientY - box.top) / box.height) * 100}%`,
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight")
      setIndex((current) => Math.min(current + 1, images.length - 1));
    if (event.key === "ArrowLeft")
      setIndex((current) => Math.max(current - 1, 0));
  };

  const handleTrackScroll = (event) => {
    const track = event.currentTarget;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <div className="relative md:hidden">
        <div
          onScroll={handleTrackScroll}
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, position) => (
            <img
              key={src}
              src={src}
              alt={`${name}, image ${position + 1} of ${images.length}`}
              width="900"
              height="1125"
              fetchpriority={position === 0 ? "high" : undefined}
              loading={position === 0 ? "eager" : "lazy"}
              className="aspect-[4/5] w-full shrink-0 snap-center bg-sand object-cover"
            />
          ))}
        </div>
        <p
          className="absolute bottom-3 right-1 bg-paper px-2 py-1 text-meta"
          aria-hidden="true"
        >
          {index + 1} / {images.length}
        </p>
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-[72px_1fr]">
        <ul className="flex flex-col gap-2" aria-label="Product images">
          {images.map((src, position) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(position)}
                aria-label={`Show image ${position + 1}`}
                aria-current={position === index}
                className={`block w-full overflow-hidden border ${position === index ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img
                  src={src}
                  alt=""
                  width="144"
                  height="180"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          onMouseMove={handleMouseMove}
          aria-label="Open image fullscreen"
          className="block cursor-zoom-in overflow-hidden bg-sand"
        >
          <img
            src={images[index]}
            alt={`${name}, image ${index + 1} of ${images.length}`}
            width="900"
            height="1125"
            fetchpriority="high"
            style={{ transformOrigin: origin }}
            className="aspect-[4/5] w-full object-cover transition-transform duration-200 hover:scale-[1.8]"
          />
        </button>
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={images}
          index={index}
          name={name}
          onChange={setIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
