import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SORT_OPTIONS } from '../lib/listing';

const readList = (params, key) => params.get(key)?.split(',').filter(Boolean) ?? [];

// Filters live in the URL so a filtered view can be shared, bookmarked and restored with the back button.
export default function useListingParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const sort = searchParams.get('sort');
    return {
      category: searchParams.get('category') ?? '',
      sizes: readList(searchParams, 'size'),
      colors: readList(searchParams, 'color'),
      prices: readList(searchParams, 'price'),
      collections: readList(searchParams, 'collection'),
      inStock: searchParams.get('stock') === 'in',
      sort: SORT_OPTIONS.some((option) => option.value === sort) ? sort : 'featured',
    };
  }, [searchParams]);

  const update = useCallback(
    (mutate) =>
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          mutate(next);
          return next;
        },
        { replace: true },
      ),
    [setSearchParams],
  );

  const toggleValue = useCallback(
    (key, value) =>
      update((next) => {
        const current = readList(next, key);
        const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
        if (updated.length) next.set(key, updated.join(','));
        else next.delete(key);
      }),
    [update],
  );

  const setValue = useCallback(
    (key, value) =>
      update((next) => {
        if (value) next.set(key, value);
        else next.delete(key);
      }),
    [update],
  );

  const clearFilters = useCallback(
    () => update((next) => ['size', 'color', 'price', 'collection', 'stock'].forEach((key) => next.delete(key))),
    [update],
  );

  return { filters, toggleValue, setValue, clearFilters };
}
