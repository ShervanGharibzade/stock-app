"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "stock-app:recent-symbols";
const MAX_RECENT = 6;

export function useRecentSymbols() {
  const [recent, setRecent] = useState([]);

  // Read after mount so server and client markup match.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setRecent(saved.filter((s) => typeof s === "string").slice(0, MAX_RECENT));
      }
    } catch {
      // Ignore corrupted or unavailable storage.
    }
  }, []);

  const remember = useCallback((symbol) => {
    setRecent((current) => {
      const next = [symbol, ...current.filter((s) => s !== symbol)].slice(
        0,
        MAX_RECENT
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage may be full or disabled; keep the in-memory list.
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setRecent([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to do.
    }
  }, []);

  return { recent, remember, clear };
}
