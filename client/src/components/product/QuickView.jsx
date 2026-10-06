import { X } from "lucide-react";
import { Link } from "react-router-dom";
import useProductSelection from "../../hooks/useProductSelection";
import Modal from "../ui/Modal";
import ColorSelector from "./ColorSelector";
import PriceTag from "./PriceTag";
import SizeSelector from "./SizeSelector";

export default function QuickView({ product, onClose }) {
  const selection = useProductSelection(product);
  const soldOut = product.stock === 0;

  const handleAdd = () => {
    if (selection.submit()) onClose();
  };

  return (
    <Modal label={`Quick view: ${product.name}`} onClose={onClose}>
      <div className="grid sm:grid-cols-2">
        <img
          src={product.images[0]}
          alt={product.name}
          width="900"
          height="1125"
          className="aspect-[4/5] w-full bg-sand object-cover"
        />
        <div className="flex flex-col gap-5 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-h2 font-semibold">{product.name}</h2>
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
                className="mt-1"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm text-charcoal">{product.description}</p>
          {product.colors.length > 1 && (
            <ColorSelector
              colors={product.colors}
              value={selection.color}
              onChange={selection.setColor}
            />
          )}
          <SizeSelector
            sizes={product.sizes}
            value={selection.size}
            onChange={selection.selectSize}
            error={selection.error}
          />
          <div className="mt-auto space-y-3">
            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut}
              className="btn btn-primary w-full"
            >
              {soldOut ? "Sold out" : "Add to cart"}
            </button>
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="link-underline block text-center text-sm font-medium"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
