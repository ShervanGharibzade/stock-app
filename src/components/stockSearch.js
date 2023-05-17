"use client";

import React ,{useState ,useEffect} from 'react'
import LineChart from "./lineChart"
import { useDebouncedCallback as Db } from 'use-debounce';


export default  function stockSearch() {
    const [value, setValue] = useState("")


  return (
    <>
        <div className='mx-auto grid gap-14 text-center text-zinc-50 p-5 w-fit'>
            <div></div>
            <div>
                <label className='block py-3 font-semibold text-zinc-400'>
                    choose stock
                </label>
                <input
                type='text'
                onChange={Db(()=>{setValue("shervan")},500)}
                placeholder='Search for Stocks' className='rounded-md text-zinc-700 px-3 py-2 w-32 mx-auto placeholder:text-xs'/>
            </div>
        </div>
        <LineChart stock={value}/>
    </>
  )
}
