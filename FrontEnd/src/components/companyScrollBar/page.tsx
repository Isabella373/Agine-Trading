"use client";
import React, { useEffect } from 'react';
import styles from './CompanyScrollBar.module.css';
import { loadCandleStick, updateFlag } from '@/store/dic';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

interface Company {
  name: string;
  symbol: string;
  price: string;
  change: string;
}

interface CompanyScrollBarProps {
  activeCompany: string;
  setActiveCompany: (company: string) => void;
  companyList: Company[];
}

const CompanyScrollBar: React.FC<CompanyScrollBarProps> = ({
  activeCompany,
  setActiveCompany,
  companyList,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const curState = useSelector((state: any) => state.dic.candleStick);

  const handleButtonClick = (company: Company) => {
    setActiveCompany(company.name);
    if (!(company.symbol in curState)) {
      dispatch(loadCandleStick([company.symbol]));
    } else {
      dispatch(updateFlag(company.symbol));
    }
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("companyScrollContainer");
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      });
    }
  }, []);

  return (
    <div className={styles.scrollContainer} id="companyScrollContainer">
      <div className={styles.scrollContent}>
        {companyList.map((company, index) => (
          <button
            key={index}
            className={`${styles.companyButton} ${activeCompany === company.name ? styles.active : ''}`}
            onClick={() => handleButtonClick(company)}
          >
            <div className={styles.companyName}>{company.name}</div>
            <div className={styles.companyDetails}>
              <span className={styles.companyPrice}>{company.price} USD</span>
              <span
                className={`${styles.companyChange} ${parseInt(company.change, 10) < 0 ? styles.negative : styles.positive}`}
              >
                {company.change}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyScrollBar;
