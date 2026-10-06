import { useRef } from "react";
import useDialog from "../../hooks/useDialog";

export default function Modal({
  label,
  onClose,
  className = "max-w-3xl",
  children,
}) {
  const panelRef = useRef(null);
  useDialog(onClose, panelRef);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="fade-in absolute inset-0 bg-ink/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`drop-in relative max-h-full w-full overflow-y-auto bg-paper ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
