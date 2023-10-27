"use client";

import Image from "next/image";
import { keyApi, baseUrl } from "@/config";
import axios from "axios";

export default function SearchStock({
  setInfo,
  info,
  loading,
  setData,
  setLoading,
}) {
  const loadingButton = "bg-blue-400/60 rounded-full p-5 animate-pulse";
  const button = "bg-zinc-700 z-50 rounded-full text-white p-3";

  const handleSubmit = async (e, data) => {
    e.preventDefault();
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
    <form
      onSubmit={(e) => handleSubmit(e, info)}
      className="w-fit flex justify-center items-center gap-5 mx-auto">
      <input
        type="text"
        className="rounded-2xl mx-auto p-2 w-42 h-10 outline-none bg-zinc-700 text-white text-center placeholder:text-center z-50"
        placeholder="Symbol"
        onChange={(e) => {
          const uppercasedSymbol = e.target.value.toUpperCase();
          setInfo({ ...info, symbol: uppercasedSymbol });
        }}
      />
      <button className={loading ? loadingButton : button} type="submit">
        {!loading && (
          <Image
            src="/images/icons8-submit-progress-50.png"
            alt="submit progress"
            width={30}
            height={30}
          />
        )}
      </button>
    </form>
  );
}
