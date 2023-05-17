"use client";

import React,{useState,useEffect} from "react";
import Welcome from "@/components/welcome";
import SearchStock from "@/components/searchStock";
import LineChart from "@/components/lineChart";
import Loading from "@/components/loading";

export default function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('IBM');

  useEffect(()=>{
    const fetchStock = async() => {
      const KEY_API = 'H5BSP36WTSGCDNPE';
      const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${KEY_API}`;
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setData(data);
      setLoading(false)
    }
    fetchStock()
  },[])


  if(loading){
    return <Loading/>
  }

  return (
    <main className="flex h-[100vh] gap-10 justify-center items-center w-fit mx-auto">
      <div className="h-full grid justify-center items-center">
      <Welcome/>
      <SearchStock getSearchResult={(result, stock) =>{
      setData(result);
      setName(stock);
      }}/>
      </div>
      <LineChart loading={loading} name={name} data={data}/>
    </main>
  )
}
