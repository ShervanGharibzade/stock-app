"use client";

import React,{useState} from 'react';


export default function searchStock({getSearchResult}) {
    const [query, setQuery] = useState("");

    const handleSubmit =  async(e) => {
        e.preventDefault();

        const KEY_API = 'H5BSP36WTSGCDNPE';
        const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${query}&apikey=${KEY_API}`;

        const res = await fetch(BASE_URL);
        const stock = await res.json();
        const name = query
        // for pass data to index page without state manager 
        getSearchResult(stock, name)
    }

  return (
    <form 
    onSubmit={handleSubmit}
    className='w-fit flex justify-center items-center gap-5 mx-auto'
    >
        <input
        type='text'
        className='rounded-2xl mx-auto p-2 w-42 h-10 outline-none bg-zinc-700 text-white text-center placeholder:text-center'
        placeholder='Search Symbol ...'
        onChange={(e) => { setQuery(e.target.value.toUpperCase())}}
        />
        <button 
        className='rounded-full mx-auto bg-blue-700 text-zinc-100 my-5 ring-8 ring-white text-xs w-12 hover:ring-green-400 hover:bg-green-600 h-12 font-bold'
        type='submit'
        >
            Go
        </button>
    </form>
  )
}
