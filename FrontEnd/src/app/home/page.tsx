/****************************************************************
 ** This is the root component for the Home page
 ***************************************************************/

 "use client";
 
import Image from "next/image";
import NavigationBar from "../navigationBar/page";
import { Fragment } from "react";
import styles from "./Home.module.css";
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function Home() {
  // Create a reference to the DOM element
  const chartContainerRef = useRef(null);

  // Use useEffect to initialize the chart after the component mounts
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, { width: 400, height: 300 });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ]);
    }
  }, []);

  return (
    <div className={styles.main}>
      <NavigationBar/>
      <div className={styles.Content}>
        Home Page
        <div ref={chartContainerRef}></div>
        </div>
    </div>
  );
}
