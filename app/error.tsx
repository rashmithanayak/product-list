"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-red-600">Something went wrong!</p>
      <button
        onClick={() => reset()}
        className="border px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}