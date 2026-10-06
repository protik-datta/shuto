export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading products"
      className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/5] bg-sand" />
          <div className="mt-3 h-3.5 w-3/4 bg-sand" />
          <div className="mt-2 h-3.5 w-1/4 bg-sand" />
        </div>
      ))}
    </div>
  );
}
