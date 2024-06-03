/****************************************************************
 ** This is the root component for the Home page
 ***************************************************************/

 "use client";

 import Image from "next/image";
 import NavigationBar from "../navigationBar/page";
 import styles from "./Home.module.css";
 import { Fragment } from 'react';
 import CompanyScrollBar from "../companyScrollBar/page";
 import SearchBar from "../searchBar/SearchBar";
 import Chart from "../chartComponent/chart"; // Import the new Chart component
 
 export default function Home() {
   return (
     <div className={styles.main}>
       <NavigationBar />
       <div className={styles.Content}>
         <div className={styles.titleContainer}>
           <div className={styles.MarketTitle}>S&P500 Real Time Market Price</div>
           <SearchBar />
         </div>
         <CompanyScrollBar />
         <div className={styles.ChartComponent}>
         <Chart />
         </div>
         <div className={styles.News}>News</div>
       </div>
     </div>
   );
 }
 