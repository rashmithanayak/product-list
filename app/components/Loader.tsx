export default function Loader() {
  return (
      <div className="flex flex-wrap justify-start gap-4 w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-40 h-64 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
  );
}