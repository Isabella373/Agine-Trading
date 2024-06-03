import { useEffect, useRef } from "react";
import { createChart } from 'lightweight-charts';
import styles from './chart.module.css';

export default function Chart() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

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

    candlestickSeries.setData([
        { time: '2019-04-01', open: 78.89, high: 81.33, low: 78.66, close: 80.01 },
        { time: '2019-04-02', open: 80.33, high: 96.76, low: 80.21, close: 96.63 },
        { time: '2019-04-03', open: 96.63, high: 97.30, low: 76.41, close: 76.64 },
        { time: '2019-04-04', open: 76.64, high: 82.10, low: 76.64, close: 81.89 },
        { time: '2019-04-05', open: 81.89, high: 82.02, low: 74.23, close: 74.43 },
        { time: '2019-04-06', open: 74.43, high: 80.25, low: 74.23, close: 80.01 },
        { time: '2019-04-07', open: 80.01, high: 97.00, low: 80.01, close: 96.63 },
        { time: '2019-04-08', open: 96.63, high: 96.63, low: 76.52, close: 76.64 },
        { time: '2019-04-09', open: 76.64, high: 82.00, low: 76.52, close: 81.89 },
        { time: '2019-04-10', open: 81.89, high: 82.22, low: 74.00, close: 74.43 },
        { time: '2019-04-11', open: 74.43, high: 75.00, low: 70.50, close: 74.00 },
        { time: '2019-04-12', open: 74.00, high: 76.00, low: 72.00, close: 75.50 },
        { time: '2019-04-13', open: 75.50, high: 78.00, low: 74.00, close: 77.50 },
        { time: '2019-04-14', open: 77.50, high: 80.00, low: 76.00, close: 78.50 },
        { time: '2019-04-15', open: 78.50, high: 79.00, low: 75.50, close: 76.00 },
        { time: '2019-04-16', open: 76.00, high: 78.50, low: 75.00, close: 77.00 },
        { time: '2019-04-17', open: 77.00, high: 78.00, low: 74.50, close: 76.50 },
        { time: '2019-04-18', open: 76.50, high: 77.50, low: 73.50, close: 74.00 },
        { time: '2019-04-19', open: 74.00, high: 76.00, low: 72.00, close: 75.00 },
        { time: '2019-04-20', open: 81.89, high: 82.22, low: 74.00, close: 74.43 },
        { time: '2019-04-21', open: 74.43, high: 75.00, low: 70.50, close: 74.00 },
        { time: '2019-04-22', open: 74.00, high: 76.00, low: 72.00, close: 75.50 },
        { time: '2019-04-23', open: 75.50, high: 78.00, low: 74.00, close: 77.50 },
        { time: '2019-04-24', open: 77.50, high: 80.00, low: 76.00, close: 78.50 },
        { time: '2019-04-25', open: 78.50, high: 79.00, low: 75.50, close: 76.00 },
        { time: '2019-04-26', open: 76.00, high: 78.50, low: 75.00, close: 77.00 },
        { time: '2019-04-27', open: 77.00, high: 78.00, low: 74.50, close: 76.50 },
        { time: '2019-04-28', open: 76.50, high: 77.50, low: 73.50, close: 74.00 },
        { time: '2019-04-29', open: 74.00, high: 76.00, low: 72.00, close: 75.00 },
        { time: '2019-04-30', open: 75.00, high: 78.50, low: 74.00, close: 77.50 },
    ]);

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
return <div ref={chartContainerRef} className={styles.chartContainer}></div>;
}