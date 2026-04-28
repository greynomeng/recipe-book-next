export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {description && (
        <p className="text-base-content/50 text-sm mb-6 max-w-xs">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
