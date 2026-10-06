import { useRef } from "react";
import useDialog from "../../hooks/useDialog";

export default function Drawer({
  side = "right",
  label,
  onClose,
  widthClass = "max-w-md",
  children,
}) {
  const panelRef = useRef(null);
  useDialog(onClose, panelRef);
  const sideClasses =
    side === "left" ? "left-0 slide-in-left" : "right-0 slide-in-right";

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fade-in absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`absolute inset-y-0 flex w-full flex-col bg-paper shadow-drawer ${widthClass} ${sideClasses}`}
      >
        {children}
      </aside>
    </div>
  );
}
