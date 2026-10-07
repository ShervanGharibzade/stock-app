/** Message panel used for the empty and error states. */
export default function Notice({ title, children, tone = "neutral", action }) {
  const styles =
    tone === "error"
      ? "border-red-500/30 bg-red-500/10"
      : "border-zinc-800 bg-zinc-900/50";
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={`space-y-2 rounded-2xl border p-8 text-center ${styles}`}
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto max-w-md text-sm text-zinc-400">{children}</p>
      {action}
    </div>
  );
}
