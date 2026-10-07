"use client";

import { useMemo } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  formatAxisLabel,
  formatFullDate,
  formatPrice,
  summarize,
} from "@/lib/format";
import StatCards from "./StatCards";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const UP = { line: "rgb(52, 211, 153)", fill: "52, 211, 153" };
const DOWN = { line: "rgb(248, 113, 113)", fill: "248, 113, 113" };

export default function StockChart({ points, query, isRefreshing }) {
  const summary = useMemo(() => summarize(points), [points]);
  const palette = summary.change >= 0 ? UP : DOWN;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const data = useMemo(
    () => ({
      labels: points.map((p) => formatAxisLabel(p.timestamp, query.timespan)),
      datasets: [
        {
          fill: true,
          label: `SMA(${query.window})`,
          data: points.map((p) => p.value),
          borderColor: palette.line,
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: palette.line,
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return `rgba(${palette.fill}, 0.2)`;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, `rgba(${palette.fill}, 0.35)`);
            gradient.addColorStop(1, `rgba(${palette.fill}, 0)`);
            return gradient;
          },
        },
      ],
    }),
    [points, query.timespan, query.window, palette]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: prefersReducedMotion ? false : { duration: 500 },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          callbacks: {
            title: (items) => formatFullDate(points[items[0].dataIndex].timestamp),
            label: (item) => `${item.dataset.label}: ${formatPrice(item.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#a1a1aa", maxTicksLimit: 6, maxRotation: 0 },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "#a1a1aa", callback: (value) => formatPrice(value) },
        },
      },
    }),
    [points, prefersReducedMotion]
  );

  const description = `Line chart of ${query.symbol} simple moving average over ${points.length} ${query.timespan} intervals, from ${formatPrice(
    points[0].value
  )} to ${formatPrice(summary.latest)}.`;

  return (
    <section
      aria-label={`${query.symbol} chart`}
      className={`space-y-4 transition-opacity ${isRefreshing ? "opacity-60" : ""}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold text-white">{query.symbol}</h2>
        <p className="text-sm text-zinc-400">
          SMA({query.window}) · {query.timespan} bars
        </p>
      </div>

      <StatCards summary={summary} />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
        <div className="h-72 sm:h-96">
          <Line
            data={data}
            options={options}
            role="img"
            aria-label={description}
          />
        </div>
      </div>

      <details className="rounded-xl border border-zinc-800 bg-zinc-900/70 text-sm">
        <summary className="cursor-pointer select-none px-4 py-3 text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
          View data table
        </summary>
        <div className="max-h-64 overflow-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th scope="col" className="py-2 pr-4">Time</th>
                <th scope="col" className="py-2 text-right">SMA</th>
              </tr>
            </thead>
            <tbody className="tabular-nums text-zinc-300">
              {[...points].reverse().map((p) => (
                <tr key={p.timestamp} className="border-t border-zinc-800">
                  <td className="py-1.5 pr-4">{formatFullDate(p.timestamp)}</td>
                  <td className="py-1.5 text-right">{formatPrice(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
