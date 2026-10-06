import { AlertCircle, Check, X } from "lucide-react";

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6"
    >
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className="toast-enter pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-sm bg-ink px-4 py-3 text-sm text-paper shadow-drawer"
        >
          {type === "error" ? (
            <AlertCircle size={16} aria-hidden="true" />
          ) : (
            <Check size={16} aria-hidden="true" />
          )}
          <span className="flex-1">{message}</span>
          <button
            type="button"
            onClick={() => onDismiss(id)}
            aria-label="Dismiss notification"
            className="opacity-70 hover:opacity-100"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
