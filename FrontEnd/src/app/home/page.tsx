"use client";
import React, { useState, useEffect, Fragment } from 'react';
import NavigationBar from '../navigationBar/page';
import styles from './Home.module.css';
import CompanyScrollBar from '../companyScrollBar/page';
import SearchBar from '../searchBar/SearchBar';
import Chart from '../chartComponent/chart'; // Import the new Chart component
import NewsLayout from '../newsLayout/page';
import ButtonGroup from '../newsButtons/newsButtons';
import companies from '../searchBar/ConstCompanies';


import { useSelector, useDispatch } from 'react-redux'
import { loadCandleStick,loadCandleSticks } from '@/store/dic';
import axios from 'axios';
import { error } from 'console';



const initialCompanies = companies.map(company => ({
  name: company.name,
  price: "", // Initially set to null
  change: "",
  symbol: company.symbol,
  alias: company.alias,
}));

export default function Home() {
  const loadingStatus = useSelector((state) => state.dic.status);
  const candleStick =  useSelector((state) => state.dic.candleStick);
  const dispatch = useDispatch()
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
      const requestArray = symbols.filter((item)=>{
        if(candleStick.hasOwnProperty(item)){return false;}else{return true;}
      })
      if(requestArray.length > 0){
        console.log(requestArray)
        await dispatch(loadCandleSticks(requestArray));
        const newCompanyData = symbols.map(symbol => {
          const symbolData = candleStick[symbol];
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
      }else{
        const newCompanyData = symbols.map(symbol => {
          const symbolData = candleStick[symbol];
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
      }
    }catch(error) {
      console.error("Error fetching volume data:", error);
    }
  };
  // Fetch volume data in batches of 10 companies
  const fetchInBatches = async () => {
    for (let i = 0; i < initialCompanies.length; i += 30) {
      const batch = initialCompanies.slice(i, i + 30).map(company => company.symbol);
      await new Promise((resolve, reject)=>{
        setTimeout(resolve,4000);
      })
      await fetchVolumeData(batch);
    }
  };
  const handleSearchResult = (result) => {
    //if there is no corresponding match in the search function, the result would be null
    if (result) {
      setFilteredCompanies([result]);
      setActiveCompany(result.name);
      dispatch(loadCandleStick([result.symbol]));
      fetchVolumeData([[result]])
    } else if(result == ""){
      setFilteredCompanies(initialCompanies);
      setActiveCompany('3M');
      dispatch(loadCandleStick([result.symbol])); ///TODO: pop up error screen company not found
      // fetchInBatches();
    }
    else {
      //in this case the result is null
      setFilteredCompanies(initialCompanies);
      setActiveCompany('3M');
      dispatch(loadCandleStick(["MMM"])); ///TODO: pop up error screen company not found
      // fetchInBatches();
    }
  };


  useEffect(() => {
    dispatch(loadCandleStick(["MMM"]));
    // fetchInBatches();
    // loadCandleStick(["MMM"]); // Fetch default data for 3M when component mounts
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
          />
          <div className={styles.ChartComponent}>
                <Chart/>
          </div>
          <ButtonGroup setActiveButton={setActiveButton} />
          {/* <NewsLayout activeButton={activeButton} /> */}
      </div>
    </div>
  );
}
