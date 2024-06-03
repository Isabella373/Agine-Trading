/****************************************************************
 ** This is the root component for the Home page
 ***************************************************************/

 "use client";

import Image from "next/image";
import NavigationBar from "../navigationBar/page";
import styles from "./Home.module.css";
import { Fragment, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import CompanyScrollBar from "../companyScrollBar/page";
import SearchBar from "../searchBar/SearchBar";

export default function Home() {
  // Create a reference to the DOM element
  const chartContainerRef = useRef(null);

  // Use useEffect to initialize the chart after the component mounts
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 400,
        height: 300,
        layout: {
          backgroundColor: '#ffffff', // Set background color to white
          textColor: '#000000', // Set text color to black
        },
        grid: {
          vertLines: {
            color: '#ffffff',
          },
          horzLines: {
            color: '#e0e0e0',
          },
        },
      });

      // Add a line series with a specific color
      const lineSeries = chart.addLineSeries({
        color: '#0000ff', // Set series line color to blue
      });
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
      <div className={styles.titleContainer}>
          <div className={styles.MarketTitle}>S&P500 Real Time Market Price</div>
          <SearchBar />
        </div>
        <CompanyScrollBar/>
        <div ref={chartContainerRef}></div>
        <div className={styles.News}>News</div>
      </div>
    </div>
  );
}
