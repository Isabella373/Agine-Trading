import React, { useState } from "react";
import styles from "./CompanyScrollBar.module.css"; // Correctly import the CSS module

export default function CompanyScrollBar() {
  const [companylist] = useState([
    "AMAZON", "NVIDIA", "APPLE", "MICROSOFT", "META", 
    "ALPHABET CL A", "JPMORGAN", "TESLA", "COSTCO WHOLESALE", 
    "MASTERCARD", "NETFLIX", "WALMART"
  ]);

  const [activeCompany, setActiveCompany] = useState("AMAZON");

  const handleButtonClick = (company) => {
    setActiveCompany(company);
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollContent}>
        {companylist.map((company, index) => (
          <button
            key={index}
            className={`${styles.companyButton} ${activeCompany === company ? styles.active : ''}`}
            onClick={() => handleButtonClick(company)}
          >
            {company}
          </button>
        ))}
      </div>
    </div>
  );
}
