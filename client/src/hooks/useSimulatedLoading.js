import { useEffect, useState } from 'react';

// Frontend-only stand-in for a network request so skeletons can be shown on navigation.
export default function useSimulatedLoading(key, duration = 250) {
  const [loadedKey, setLoadedKey] = useState(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setLoadedKey(key), duration);
    return () => window.clearTimeout(timer);
  }, [key, duration]);
  return loadedKey !== key;
}
