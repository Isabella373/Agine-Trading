import React, { useState } from "react";
import styles from "./CompanyScrollBar.module.css"; // Correctly import the CSS module

export default function CompanyScrollBar() {
  const [companyList] = useState([
    { name: "AMAZON", price: 500, change: 8 },
    { name: "NVIDIA", price: 300, change: -2 },
    { name: "APPLE", price: 200, change: 5 },
    { name: "MICROSOFT", price: 400, change: 3 },
    { name: "META", price: 250, change: -1 },
    { name: "ALPHABET CL A", price: 700, change: 4 },
    { name: "JPMORGAN", price: 350, change: 0 },
    { name: "TESLA", price: 600, change: 10 },
    { name: "COSTCO WHOLESALE", price: 450, change: -3 },
    { name: "MASTERCARD", price: 550, change: 6 },
    { name: "NETFLIX", price: 650, change: -4 },
    { name: "WALMART", price: 300, change: 2 }
  ]);

  const [activeCompany, setActiveCompany] = useState("AMAZON");

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
