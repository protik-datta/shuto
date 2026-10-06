const STYLES = {
  Processing: "bg-sand text-charcoal",
  Shipped: "bg-charcoal text-paper",
  Delivered: "border border-ink text-ink",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-meta font-medium ${STYLES[status] ?? STYLES.Processing}`}
    >
      {status}
    </span>
  );
}
