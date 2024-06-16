"use client";
import React, { useEffect, useRef } from 'react';
import styles from './CompanyScrollBar.module.css'; // Correctly import the CSS module
import { loadCandleStick } from '@/store/dic';
import { useSelector, useDispatch } from 'react-redux'
import { updateFlag } from '@/store/dic';

export default function CompanyScrollBar({ activeCompany, setActiveCompany, companyList }) {
  const dispatch = useDispatch()
  const curState = useSelector( state => state.dic.candleStick);
  const handleButtonClick = (company) => {
    setActiveCompany(company.name);
    if(! (company.symbol in curState)){
      dispatch(loadCandleStick([company.symbol]));
    }else{
      dispatch(updateFlag(company.symbol));
    }
  };

useEffect(()=>{
  let scrollContainer = document.getElementById("companyScrollContainer");
  scrollContainer.addEventListener('wheel',(event)=>{
      event.preventDefault()
      scrollContainer.scrollLeft +=  event.deltaY
  })
},[])


  return (
    <div className={styles.scrollContainer} id="companyScrollContainer"  >
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
              <span className={`${styles.companyChange} ${company.change < 0 ? styles.negative : styles.positive}`}>
                {company.change}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
