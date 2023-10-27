"use client";

import React, { useState } from "react";
import Welcome from "@/components/welcome";
import SearchStock from "@/components/searchStock";
import LineChart from "@/components/lineChart";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    symbol: "",
    timespan: "",
  });
  const [nameStock, setNameStock] = useState("");

  return (
    <main className="py-16 lg:flex h-[100vh] gap-10 justify-center items-center w-fit mx-auto">
      <div className="h-full grid gap-5 lg:gap-0 justify-center items-center w-1/2 lg:w-full">
        <Welcome />
        <div className="block lg:hidden">
          {data && (
            <LineChart name={info.symbol} loading={loading} data={data} />
          )}
        </div>
        <SearchStock
          loading={loading}
          setLoading={setLoading}
          info={info}
          setInfo={setInfo}
          data={data}
          setNameStock={setNameStock}
          setData={setData}
        />
      </div>
      {data && (
        <div className="hidden lg:block w-1/2 lg:w-full">
          <LineChart name={info.symbol} loading={loading} data={data} />
        </div>
      )}
    </main>
  );
}
