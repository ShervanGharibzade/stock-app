"use client";

import { useId, useState } from "react";
import {
  DEFAULT_QUERY,
  normalizeSymbol,
  TIMESPANS,
  validateSymbol,
  WINDOWS,
} from "@/lib/polygon";

export default function SearchForm({ onSearch, isLoading, recent, onClearRecent }) {
  const id = useId();
  const [symbol, setSymbol] = useState(DEFAULT_QUERY.symbol);
  const [timespan, setTimespan] = useState(DEFAULT_QUERY.timespan);
  const [smaWindow, setSmaWindow] = useState(DEFAULT_QUERY.window);
  const [error, setError] = useState("");

  function submit(rawSymbol) {
    const normalized = normalizeSymbol(rawSymbol);
    const message = validateSymbol(normalized);
    setError(message);
    if (message) return;
    setSymbol(normalized);
    onSearch({ symbol: normalized, timespan, window: smaWindow });
  }

  return (
    <section
      aria-label="Search"
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 backdrop-blur"
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          submit(symbol);
        }}
        className="grid gap-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-start"
      >
        <div className="space-y-1.5">
          <label htmlFor={`${id}-symbol`} className="text-sm font-medium text-zinc-300">
            Symbol
          </label>
          <input
            id={`${id}-symbol`}
            type="text"
            value={symbol}
            onChange={(event) => {
              setSymbol(event.target.value.toUpperCase());
              if (error) setError("");
            }}
            placeholder="AAPL"
            maxLength={8}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="field font-semibold tracking-wider"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`${id}-timespan`} className="text-sm font-medium text-zinc-300">
            Interval
          </label>
          <select
            id={`${id}-timespan`}
            value={timespan}
            onChange={(event) => setTimespan(event.target.value)}
            className="field"
          >
            {TIMESPANS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`${id}-window`} className="text-sm font-medium text-zinc-300">
            SMA window
          </label>
          <select
            id={`${id}-window`}
            value={smaWindow}
            onChange={(event) => setSmaWindow(Number(event.target.value))}
            className="field"
          >
            {WINDOWS.map((value) => (
              <option key={value} value={value}>
                {value} periods
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary sm:mt-[1.625rem]"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              Searching…
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      {recent.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-zinc-800 pt-4">
          <span className="text-xs uppercase tracking-wide text-zinc-500">
            Recent
          </span>
          {recent.map((item) => (
            <button
              key={item}
              type="button"
              disabled={isLoading}
              onClick={() => submit(item)}
              className="chip"
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={onClearRecent}
            className="ml-auto text-xs text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Clear
          </button>
        </div>
      )}
    </section>
  );
}
