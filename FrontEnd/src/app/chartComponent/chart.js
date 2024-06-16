import { Fragment, useEffect, useRef } from "react";
import { createChart } from 'lightweight-charts';
import styles from './chart.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { updateCandleStick } from '@/store/dic'

export default function Chart() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const originCandleStick =  useSelector((state) => state.dic.candleStick);
  const flag = useSelector((state) => state.dic.flag)
  const loadingStatus = useSelector((state) => state.dic.status);
  // console.log(originData)
  // const dataProcess = ()=>{
  //   if (candlestickSeriesRef.current && curChart) {
  //     originData = useSelector((state) => state.dic.candleStick)[curChart];
  //     console.log("Original Data:", originData);
  //     const sortedData = [...originData].sort((a, b) => a.time - b.time);
  //     const reversedData = sortedData.reverse()
  //     console.log("Sorted Data:", reversedData);
  //     candlestickSeriesRef.current.setData(sortedData);
  //   }
  // }





useEffect(() => {
    if (chartContainerRef.current) {
        //set up the chart container
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
            background: { color: "#000000" }, // Set background color
            textColor: "#C3BCDB",
          },
          grid: {
            vertLines: { color: "#444" }, // Set vertical line color
            horzLines: { color: "#444" }, // Set horizontal line color
          },
      });
      chartRef.current = chart;

      //set up the chart content
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#00ff00',
        downColor: '#ff0000',
        borderDownColor: '#ff0000',
        borderUpColor: '#00ff00',
        wickDownColor: '#ff0000',
        wickUpColor: '#00ff00',
      });
      candlestickSeriesRef.current = candlestickSeries;
      
    // Event listener for window resizing
    const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      };
    window.addEventListener("resize", handleResize);

      // Cleanup on component unmount
      return () => {
        if (chartRef.current) {
          chartRef.current.remove();
        }
      };
  }
}, []);

useEffect(()=>{
  if(Object.keys(originCandleStick).length > 0){
    // console.log(originCandleStick[flag])
    candlestickSeriesRef.current.setData(originCandleStick[flag]);
  }
}, [originCandleStick])

return (
    <div ref={chartContainerRef} className={styles.chartContainer}></div>
  )
}