"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
      <p className="mb-4 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}