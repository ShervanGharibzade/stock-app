"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { fetchSma, StockApiError } from "@/lib/polygon";

const initialState = { status: "idle", query: null, points: [], error: "" };

function reducer(state, action) {
  switch (action.type) {
    case "start":
      // Keep the previous points so the chart does not flash empty.
      return { ...state, status: "loading", query: action.query, error: "" };
    case "success":
      return { ...state, status: "success", points: action.points };
    case "error":
      return { ...state, status: "error", points: [], error: action.error };
    default:
      return state;
  }
}

/** Loads SMA data; a newer search always cancels the one still running. */
export function useStockSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const controllerRef = useRef(null);

  const search = useCallback(async (query) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    dispatch({ type: "start", query });
    try {
      const points = await fetchSma(query, controller.signal);
      if (!controller.signal.aborted) dispatch({ type: "success", points });
    } catch (error) {
      if (controller.signal.aborted) return;
      dispatch({
        type: "error",
        error:
          error instanceof StockApiError
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { ...state, search };
}
