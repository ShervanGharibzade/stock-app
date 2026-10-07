"use client";

import { useEffect } from "react";
import Background from "@/components/Background";
import ChartSkeleton from "@/components/ChartSkeleton";
import Hero from "@/components/Hero";
import Notice from "@/components/Notice";
import SearchForm from "@/components/SearchForm";
import StockChart from "@/components/StockChart";
import { useRecentSymbols } from "@/hooks/useRecentSymbols";
import { useStockSearch } from "@/hooks/useStockSearch";

export default function Home() {
  const { status, query, points, error, search } = useStockSearch();
  const { recent, remember, clear } = useRecentSymbols();

  const isLoading = status === "loading";

  useEffect(() => {
    if (status === "success" && query) remember(query.symbol);
  }, [status, query, remember]);

  return (
    <>
      <Background />
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-12 sm:py-16">
        <Hero />
        <SearchForm
          onSearch={search}
          isLoading={isLoading}
          recent={recent}
          onClearRecent={clear}
        />

        <div aria-live="polite">
          {isLoading && points.length === 0 && <ChartSkeleton />}

          {points.length > 0 && query && (
            <StockChart points={points} query={query} isRefreshing={isLoading} />
          )}

          {status === "error" && (
            <Notice
              tone="error"
              title="Couldn’t load data"
              action={
                <button
                  type="button"
                  onClick={() => search(query)}
                  className="btn-primary mt-3"
                >
                  Try again
                </button>
              }
            >
              {error}
            </Notice>
          )}

          {status === "idle" && (
            <Notice title="Search for a stock">
              Enter a ticker such as AAPL, MSFT or TSLA to see how its moving
              average has trended.
            </Notice>
          )}
        </div>
      </main>
    </>
  );
}
