

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );  
  
  export default function lineChart({data, name, loading}) {
    
    let timeSeries = [];
    let openPrice = [];
    let shortTime = [];


      // get times and price 
    Object?.keys(data["Time Series (Daily)"]).forEach(key => {
        if(timeSeries.length <20 && openPrice.length <20){
        timeSeries.push(key)
        openPrice.push(data["Time Series (Daily)"][key]["1. open"])
        }
      })

        // shorten times for chart
      timeSeries.map(time=>{
        shortTime.push("/"+time.slice(5,10)+"/")
      })



      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: "Chart.js Line Chart",
          },
        },
      };
      

    const labels = shortTime

    const dataChart = {
      labels,
        datasets: [
          {
            fill: true,
            label: "stock",
            tension: "0.4",
            data: openPrice,
            borderColor: "rgb(100, 200, 10)",
            backgroundColor: "rgba(100, 200, 10, 0.5)",
          },
        ],
      };
      

    return (
        <div className="w-[800px] my-6 text-center p-5 mx-auto">
          <h2 className='text-3xl text-white font-semibold'>
            Symbol : {name} 
            </h2>
            <Line options={options} data={dataChart} />
        </div>
    );
  }