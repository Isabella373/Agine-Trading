"use client";
import React, { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/page';
import styles from './Home.module.css';
import CompanyScrollBar from '../../components/companyScrollBar/page';
import SearchBar from '../searchBar/SearchBar';
import Chart from '../chartComponent/chart';
import ButtonGroup from '../newsButtons/newsButtons';
import companies from '../searchBar/ConstCompanies';
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { loadCandleStick, loadCandleSticks } from '@/store/dic';

// Define the Company type
type Company = {
  name: string;
  price: string;
  change: string;
  symbol: string;
  alias: string[];
};

const initialCompanies = companies.map(company => ({
  name: company.name,
  price: "", // Initially set to empty string
  change: "", // Initially set to empty string
  symbol: company.symbol,
  alias: company.alias,
}));

export default function Home() {
  const loadingStatus = useSelector((state: RootState) => state.dic.status);
  const candleStick = useSelector((state: RootState) => state.dic.candleStick);
  const dispatch = useDispatch<AppDispatch>();
  const [activeCompany, setActiveCompany] = useState('3M');
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [activeButton, setActiveButton] = useState('Real-Time News');

  const formatNumberWithCommas = (number: number) => {
    return new Intl.NumberFormat().format(number);
  };

  const fetchVolumeData = async (symbols: string[]) => {
    try {
      const requestArray = symbols.filter((item) => !candleStick.hasOwnProperty(item));
      if (requestArray.length > 0) {
        await dispatch(loadCandleSticks(requestArray));
      }

      const newCompanyData = symbols.map(symbol => {
        const symbolData = candleStick[symbol];
        if (symbolData && symbolData.length) {
          const volume = symbolData[0].volume;
          return { symbol, price: formatNumberWithCommas(volume) };
        }
        return { symbol, price: formatNumberWithCommas(0) };
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

  const handleSearchResult = (result: Company | null) => {
    if (result) {
      setFilteredCompanies([result]);
      setActiveCompany(result.name);
      dispatch(loadCandleStick([result.symbol]));
      fetchVolumeData([result.symbol]);
    } else {
      setFilteredCompanies(initialCompanies);
      setActiveCompany('3M');
      dispatch(loadCandleStick(["MMM"]));
    }
  };

  useEffect(() => {
    dispatch(loadCandleStick(["MMM"]));
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
          <Chart />
        </div>
        <ButtonGroup activeButton={activeButton} setActiveButton={setActiveButton} />
      </div>
    </div>
  );
}
