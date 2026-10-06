export default function Field({
  label,
  id,
  error,
  as: Tag = "input",
  className = "",
  children,
  ...props
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`input ${Tag === "textarea" ? "min-h-32 py-3" : ""}`}
        {...props}
      >
        {children}
      </Tag>
      {error && (
        <p id={errorId} className="mt-1.5 text-meta text-sale">
          {error}
        </p>
      )}
    </div>
  );
}
