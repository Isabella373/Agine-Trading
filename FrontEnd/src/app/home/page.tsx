"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavigationBar from '../navigationBar/page';
import styles from './Home.module.css';
import CompanyScrollBar from '../companyScrollBar/page';
import SearchBar from '../searchBar/SearchBar';
import Chart from '../chartComponent/chart'; // Import the new Chart component
import NewsLayout from '../newsLayout/page';
import ButtonGroup from '../newsButtons/newsButtons';
import companies from '../searchBar/ConstCompanies';

import { useSelector, useDispatch } from 'react-redux'
import { changeSP500_list } from '@/store/dic'
import axios from 'axios';

const initialCompanies = companies.map(company => ({
  name: company.name,
  price: 0, // Set price to 0
  change: 0, // Set change to 0
  symbol: company.symbol,
  alias: company.alias,
}));

export default function Home() {
  const [activeCompany, setActiveCompany] = useState('3M');
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [activeButton, setActiveButton] = useState('Real-Time News');
  const [chartData, setChartData] = useState([]);

  const handleSearchResult = (result) => {
    console.log(result)
    if (result) {
      setFilteredCompanies([result]);
      setActiveCompany(result.name);
      console.log("result:"+ result.name + "   " + result.symbol);
      handleCandlestickRequest([result.symbol]);
    } else {
      setFilteredCompanies(initialCompanies);
      setActiveCompany('3M');
      handleCandlestickRequest([""]); ///TODO: pop up error screen company not found
    }
  };

  //format of requestBody should be ["A", "AES"]
  const handleCandlestickRequest = (symbols:Array<string>) => {
    axios.post(
      "http://127.0.0.1:8000/candlestickDataTarget/",
      symbols,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(function (response) {
        console.log(response);
        const symbol = symbols[0];
        const data = response.data[symbol];
        const parsedData = data.map(item => ({
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));
        setChartData(parsedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    handleCandlestickRequest(["MMM"]); // Fetch default data for 3M when component mounts
  }, []);

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
          handleCandlestickRequest={handleCandlestickRequest}
        />
        <div className={styles.ChartComponent}>
          <Chart data={chartData}/>
          </div>
          <ButtonGroup setActiveButton={setActiveButton} />
          <NewsLayout activeButton={activeButton} />
      </div>
    </div>
  );
}
