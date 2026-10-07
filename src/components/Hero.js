export default function Hero() {
  return (
    <header className="space-y-3 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Stock <span className="text-emerald-400">Trends</span>
      </h1>
      <p className="mx-auto max-w-xl text-balance text-zinc-400">
        Look up a ticker and see its simple moving average (SMA) over time.
      </p>
    </header>
  );
}
