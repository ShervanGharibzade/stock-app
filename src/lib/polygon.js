import axios from "axios";
import { baseUrl, keyApi } from "@/config";

export const TIMESPANS = [
  { value: "minute", label: "Minute" },
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
];

export const WINDOWS = [10, 20, 50];

export const DEFAULT_QUERY = { symbol: "", timespan: "day", window: 20 };

const POINTS_LIMIT = 30;
const SYMBOL_PATTERN = /^[A-Z]{1,5}([.-][A-Z]{1,2})?$/;

export class StockApiError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "StockApiError";
    this.code = code;
  }
}

export function normalizeSymbol(raw) {
  return String(raw ?? "").trim().toUpperCase();
}

/** Returns an error message, or an empty string when the symbol looks valid. */
export function validateSymbol(symbol) {
  if (!symbol) return "Enter a stock symbol, for example AAPL.";
  if (!SYMBOL_PATTERN.test(symbol)) {
    return "Use 1–5 letters, like AAPL or BRK.B.";
  }
  return "";
}

function describeError(error) {
  if (error.code === "ECONNABORTED") {
    return "The request timed out. Please try again.";
  }
  if (!error.response) {
    return "Could not reach the data provider. Check your connection and try again.";
  }
  switch (error.response.status) {
    case 401:
    case 403:
      return "The API key was rejected, or your plan does not include this data.";
    case 404:
      return "That symbol was not found.";
    case 429:
      return "Too many requests. The free plan allows about 5 per minute, so wait a moment and retry.";
    default:
      return "The data provider returned an error. Please try again later.";
  }
}

/**
 * Fetches the simple moving average for a symbol.
 * Resolves to points sorted oldest → newest: [{ timestamp, value }].
 */
export async function fetchSma({ symbol, timespan, window }, signal) {
  if (!keyApi) {
    throw new StockApiError(
      "The app has no API key configured. Add NEXT_PUBLIC_APP_API_KEY to .env.local.",
      "config"
    );
  }

  try {
    const response = await axios.get(
      `${baseUrl}/${encodeURIComponent(symbol)}`,
      {
        params: {
          timespan,
          adjusted: true,
          window,
          series_type: "close",
          order: "desc",
          limit: POINTS_LIMIT,
          apiKey: keyApi,
        },
        signal,
        timeout: 15000,
      }
    );

    const values = response.data?.results?.values;
    const points = Array.isArray(values)
      ? values
          .filter(
            (item) =>
              Number.isFinite(item?.timestamp) && Number.isFinite(item?.value)
          )
          .map(({ timestamp, value }) => ({ timestamp, value }))
          .sort((a, b) => a.timestamp - b.timestamp)
      : [];

    if (points.length === 0) {
      throw new StockApiError(
        `No data found for ${symbol}. Check the symbol or try another timespan.`,
        "empty"
      );
    }
    return points;
  } catch (error) {
    if (error instanceof StockApiError || axios.isCancel(error)) throw error;
    throw new StockApiError(describeError(error), "network");
  }
}
