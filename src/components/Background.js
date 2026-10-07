/** Decorative animated glow. Purely visual, so hidden from assistive tech. */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="glow glow-c" />
    </div>
  );
}
