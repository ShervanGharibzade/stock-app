# Stock Trends

Search a stock symbol and chart its simple moving average (SMA) using the
[Polygon.io](https://polygon.io) indicators API. Built with Next.js 13 (App Router), Tailwind CSS and Chart.js.

## Setup

```bash
npm install
cp .env.example .env.local   # then put your own Polygon.io key in it
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run lint`, `npm run build` (static export to `./out`).

> **Security note:** `NEXT_PUBLIC_*` variables are embedded in the browser bundle, so anyone can read the key
> from the deployed site. Use a free/restricted key. Keys that were ever committed to git should be rotated.

## Features

- Symbol validation, interval (minute / hour / day) and SMA window (10 / 20 / 50)
- Summary cards (latest, change, high, low), gradient chart that turns red/green with the trend
- Loading skeleton, friendly errors (rate limit, bad key, unknown symbol, offline) with retry
- Recent searches saved locally, accessible data table, keyboard and screen-reader friendly, reduced-motion aware
- A newer search cancels the previous request, so results never arrive out of order

## Structure

```
src/
  app/          page, layout, global styles
  components/   Hero, SearchForm, StockChart, StatCards, ChartSkeleton, Notice, Background
  hooks/        useStockSearch (request state), useRecentSymbols
  lib/          polygon.js (API + error mapping), format.js (formatting + stats)
  config/       environment configuration
```

## Deploying to GitHub Pages

Add a repository secret `POLYGON_API_KEY`; the workflow in `.github/workflows/nextjs.yml` builds and publishes `./out`.
