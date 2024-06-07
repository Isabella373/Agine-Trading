"use client";
import React from 'react';
import styles from './CompanyScrollBar.module.css'; // Correctly import the CSS module

export default function CompanyScrollBar({ activeCompany, setActiveCompany, companyList }) {
  const handleButtonClick = (company) => {
    setActiveCompany(company.name);
  };

  return (
    <div className={styles.scrollContainer}>
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
