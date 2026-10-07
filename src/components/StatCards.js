import { formatPercent, formatPrice } from "@/lib/format";

function Stat({ label, value, tone = "text-white" }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className={`mt-1 text-lg font-semibold tabular-nums ${tone}`}>{value}</dd>
    </div>
  );
}

export default function StatCards({ summary }) {
  const isUp = summary.change >= 0;
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat label="Latest SMA" value={formatPrice(summary.latest)} />
      <Stat
        label="Change"
        value={`${isUp ? "+" : "−"}${formatPrice(Math.abs(summary.change))} (${formatPercent(
          summary.changePercent
        )})`}
        tone={isUp ? "text-emerald-400" : "text-red-400"}
      />
      <Stat label="High" value={formatPrice(summary.high)} />
      <Stat label="Low" value={formatPrice(summary.low)} />
    </dl>
  );
}
