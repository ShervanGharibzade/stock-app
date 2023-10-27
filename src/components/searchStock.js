"use client";

import { keyApi, baseUrl } from "@/config";
import axios from "axios";
import { useState } from "react";

export default function SearchStock({
  setInfo,
  info,
  loading,
  setData,
  setLoading,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const loadingButton = "bg-blue-400/60 rounded-full p-5 animate-pulse ";
  const button =
    "bg-zinc-700 z-50 rounded-full text-white w-16 h-16 text-zinc-300";

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setData({ ...info, symbol: searchValue });
    setLoading(true);
    const apiUrl = `${baseUrl}/${data.symbol}?timespan=${data.timespan}&adjusted=true&window=50&series_type=open&order=desc&apiKey=${keyApi}`;
    try {
      const res = await axios.get(apiUrl);
      setData(res.data);
      console.log("ok", res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          if (info.symbol) handleSubmit(e, info);
          else setError("Symbol is empty");
        }}
        className="w-fit flex justify-center items-center gap-5 mx-auto">
        <input
          type="text"
          className="rounded-3xl mx-auto p-2 w-42 h-16 outline-none bg-zinc-700 text-white text-center placeholder:text-center z-50"
          placeholder="Symbol"
          onChange={(e) => {
            const uppercasedSymbol = e.target.value.toUpperCase();
            setSearchValue(uppercasedSymbol);
          }}
        />
        <button className={loading ? loadingButton : button} type="submit">
          {!loading && "Sub"}
        </button>
      </form>
      <h2 className="text-red-500 font-bold absolute bottom-10 left-1/2 -translate-x-1/2">
        {error}
      </h2>
    </>
  );
}
