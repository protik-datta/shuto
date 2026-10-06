import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import Modal from "../ui/Modal";

export default function Lightbox({ images, index, name, onChange, onClose }) {
  const count = images.length;
  const step = (direction) => onChange((index + direction + count) % count);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowLeft") onChange((index - 1 + count) % count);
      if (event.key === "ArrowRight") onChange((index + 1) % count);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [index, count, onChange]);

  const arrowClass =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-paper";

  return (
    <Modal
      label={`${name} images`}
      onClose={onClose}
      className="h-full max-w-none bg-ink sm:h-full"
    >
      <div className="relative flex h-full items-center justify-center">
        <img
          src={images[index]}
          alt={`${name}, image ${index + 1} of ${count}`}
          className="max-h-full max-w-full object-contain"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close fullscreen"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-paper"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous image"
          className={`${arrowClass} left-4`}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next image"
          className={`${arrowClass} right-4`}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-paper px-3 py-1 text-meta">
          {index + 1} / {count}
        </p>
      </div>
    </Modal>
  );
}
