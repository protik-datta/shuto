import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function useDialog(onClose, containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    const previouslyFocused = document.activeElement;
    const getFocusable = () => [...container.querySelectorAll(FOCUSABLE)];

    document.body.style.overflow = 'hidden';
    (getFocusable()[0] ?? container).focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') return onClose();
      if (event.key !== 'Tab') return undefined;
      const items = getFocusable();
      if (!items.length) return undefined;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return undefined;
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose, containerRef]);
}
