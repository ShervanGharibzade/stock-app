const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value) => currency.format(value);

export function formatPercent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/** Short axis label that suits the chosen timespan. */
export function formatAxisLabel(timestamp, timespan) {
  const date = new Date(timestamp);
  if (timespan === "day") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: timespan === "minute" ? "2-digit" : undefined,
  });
}

export function formatFullDate(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Summary numbers for a list of oldest → newest points. */
export function summarize(points) {
  const values = points.map((p) => p.value);
  const first = values[0];
  const latest = values[values.length - 1];
  const change = latest - first;
  return {
    latest,
    change,
    changePercent: first === 0 ? 0 : (change / first) * 100,
    high: Math.max(...values),
    low: Math.min(...values),
  };
}
