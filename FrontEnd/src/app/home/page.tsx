"use client";
import React, { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/page';
import styles from './Home.module.css';
import CompanyScrollBar from '../companyScrollBar/page';
import SearchBar from '../searchBar/SearchBar';
import Chart from '../chartComponent/chart'; // Import the new Chart component
import NewsLayout from '../newsLayout/page';
import ButtonGroup from '../newsButtons/newsButtons';
import companies from '../searchBar/ConstCompanies';

import axios from 'axios';

const initialCompanies = companies.map(company => ({
  name: company.name,
  price: "", // Initially set to null
  change: "",
  symbol: company.symbol,
  alias: company.alias,
}));

export default function Home() {
  const [activeCompany, setActiveCompany] = useState('3M');
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [activeButton, setActiveButton] = useState('Real-Time News');
  const [chartData, setChartData] = useState([]);
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // Function to fetch volume data for a batch of companies
  const fetchVolumeData = async (symbols) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/candlestickDataTarget/",
        symbols,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const newCompanyData = symbols.map(symbol => {
        const symbolData = response.data[symbol];
        if (symbolData && symbolData.length) {
          const volume = symbolData[0].volume;
          return { symbol, price: formatNumberWithCommas(volume) };
        }
        return { symbol, price: 0 };
      });

      setFilteredCompanies(prevCompanies => 
        prevCompanies.map(company => {
          const newData = newCompanyData.find(c => c.symbol === company.symbol);
          return newData ? { ...company, price: newData.price } : company;
        })
      );
    } catch (error) {
      console.error("Error fetching volume data:", error);
    }
  };

  const fetchInBatches = async () => {
    for (let i = 0; i < initialCompanies.length; i += 10) {
      const batch = initialCompanies.slice(i, i + 10).map(company => company.symbol);
      await fetchVolumeData(batch);
    }
  };
  // Fetch volume data in batches of 10 companies
  useEffect(() => {
    
    fetchInBatches();
  }, []);

  const handleSearchResult = (result) => {
    if (result) {
      setFilteredCompanies([result]);
      setActiveCompany(result.name);
      handleCandlestickRequest([result.symbol]);
      fetchVolumeData([[result]])
    } else if(result == ""){
      setFilteredCompanies(initialCompanies);
      setActiveCompany('3M');
      handleCandlestickRequest(["MMM"]); ///TODO: pop up error screen company not found
      fetchInBatches();
    }
    else {
      setFilteredCompanies(initialCompanies);
      setActiveCompany('3M');
      handleCandlestickRequest([""]); ///TODO: pop up error screen company not found
      fetchInBatches();
    }
  };

  // Format of requestBody should be ["A", "AES"]
  const handleCandlestickRequest = (symbols) => {
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
          volume: item.volume,
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
