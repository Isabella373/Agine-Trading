"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import NavigationBar from '../navigationBar/page';
import styles from './Home.module.css';
import CompanyScrollBar from '../companyScrollBar/page';
import SearchBar from '../searchBar/SearchBar';
import Chart from '../chartComponent/chart'; // Import the new Chart component
import NewsLayout from '../newsLayout/page';
import ButtonGroup from '../newsButtons/newsButtons';

import { useSelector, useDispatch } from 'react-redux'
import { changeSP500_list } from '@/store/dic'
import axios from 'axios';

const initialCompanies = [
  { name: 'AMAZON', price: 500, change: 8 },
  { name: 'NVIDIA', price: 300, change: -2 },
  { name: 'APPLE', price: 200, change: 5 },
  { name: 'MICROSOFT', price: 400, change: 3 },
  { name: 'META', price: 250, change: -1 },
  { name: 'ALPHABET A', price: 700, change: 4 },
  { name: 'JPMORGAN Chase', price: 350, change: 0 },
  { name: 'TESLA', price: 600, change: 10 },
  { name: 'COSTCO WHOLESALE', price: 450, change: -3 },
  { name: 'MASTERCARD', price: 550, change: 6 },
  { name: 'NETFLIX', price: 650, change: -4 },
  { name: 'WALMART', price: 300, change: 2 }
];

export default function Home() {
  const [activeCompany, setActiveCompany] = useState('AMAZON');
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [activeButton, setActiveButton] = useState('Real-Time News');

  const handleSearchResult = (result) => {
    console.log(result)
    if (result) {
      setFilteredCompanies([result]);
      setActiveCompany(result.name);
      console.log("result:"+ result.name + "   " + result.symbol);
      handleCandlestickRequest([result.symbol]);
    } else {
      setFilteredCompanies(initialCompanies);
      setActiveCompany('AMAZON');
      handleCandlestickRequest(["AMZN"]);
    }
  };

  //format of requestBody should be ["A", "AES"]
  const handleCandlestickRequest = (symbol:Array<string>) => {
    let requstBody = {"targetList" : symbol}
    axios.post(
      "http://127.0.0.1:8000/candlestickDataTarget/",
      symbol,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(function (response) {
        console.log(response);
        // Process the response here
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={styles.main}>
      <NavigationBar />
      <div className={styles.Content}>
        <div className={styles.titleContainer}>
          <div className={styles.MarketTitle}>S&P500 Real Time Market Price</div>
          <SearchBar onSearch={handleSearchResult} />
        </div>
        <CompanyScrollBar
          activeCompany={activeCompany}
          setActiveCompany={setActiveCompany}
          companyList={filteredCompanies}
        />
        <div className={styles.ChartComponent}>
          <Chart />
          </div>
          <ButtonGroup setActiveButton={setActiveButton} />
          <NewsLayout activeButton={activeButton} />
      </div>
    </div>
  );
}
