export default function LoadingSpinner({ className = "" }) {
  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <span className="loading loading-spinner loading-lg text-pretty"></span>
    </div>
  );
}
