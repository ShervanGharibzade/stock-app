export default function ChartSkeleton() {
  return (
    <div role="status" className="animate-pulse space-y-4">
      <div className="h-8 w-32 rounded-md bg-zinc-800" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-[74px] rounded-xl bg-zinc-800/70" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-zinc-800/70 sm:h-96" />
      <span className="sr-only">Loading chart…</span>
    </div>
  );
}
