"use client";

import { keyApi, baseUrl } from "@/config";
import axios from "axios";
import { useState } from "react";

export default function SearchStock({ setInfo, loading, setData, setLoading }) {
  const [symbol, setSymbol] = useState("");
  const [timespan, setTimespan] = useState("minute");
  const [error, setError] = useState("");
  const loadingButton = "bg-blue-400/60 rounded-full p-5 animate-pulse ";
  const button =
    "bg-zinc-700 z-50 rounded-full text-white w-16 h-16 text-zinc-300";

  const handleSubmit = async (e, symbol, timespan) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = `${baseUrl}/${symbol}?timespan=${timespan}&adjusted=true&window=50&series_type=open&order=desc&apiKey=${keyApi}`;
    try {
      const res = await axios.get(apiUrl);
      setData(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setInfo({ ...setInfo, symbol: symbol });
    setLoading(false);
  };
  console.log(timespan);
  return (
    <>
      <form
        onSubmit={(e) => {
          if (symbol && timespan) {
            handleSubmit(e, symbol, timespan);
            setError("");
          } else {
            e.preventDefault();
            setError("Symbol or time is empty");
          }
        }}
        className="w-fit flex justify-center items-center gap-5 mx-auto">
        <input
          type="text"
          className="rounded-3xl mx-auto p-2 w-42 h-16 outline-none bg-zinc-700 text-white text-center placeholder:text-center z-50"
          onChange={(e) => {
            const uppercase_Symbol = e.target.value.toUpperCase();
            setSymbol(uppercase_Symbol);
          }}
          placeholder={symbol}
        />
        <select
          className="bg-zinc-700 text-white p-3 rounded-lg"
          onChange={(e) => setTimespan(e.target.value)}>
          <option value="minute">miu</option>
          <option value="hour">hour</option>
          <option value="day">day</option>
        </select>
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
