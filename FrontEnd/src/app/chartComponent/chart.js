import { useEffect, useRef } from "react";
import { createChart } from 'lightweight-charts';
import styles from './chart.module.css';

export default function Chart({data}) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

useEffect(() => {
    if (chartContainerRef.current) {
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

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#00ff00',
        downColor: '#ff0000',
        borderDownColor: '#ff0000',
        borderUpColor: '#00ff00',
        wickDownColor: '#ff0000',
        wickUpColor: '#00ff00',
      });

      candlestickSeriesRef.current = candlestickSeries;

      if (data) {
        candlestickSeries.setData(data);
      }

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

useEffect(() => {
  if (candlestickSeriesRef.current && data) {
    console.log("Original Data:", data);
    const sortedData = [...data].sort((a, b) => a.time - b.time);
    const reversedData = sortedData.reverse()
    console.log("Sorted Data:", reversedData);
    candlestickSeriesRef.current.setData(sortedData);
  }
}, [data]);

return <div ref={chartContainerRef} className={styles.chartContainer}></div>;
}