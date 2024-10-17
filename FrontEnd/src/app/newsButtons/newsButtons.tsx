import React, { useState } from 'react';
import styles from './newsButtons.module.css'; // Import CSS module

// Define the type for props
type ButtonGroupProps = {
  setActiveButton: React.Dispatch<React.SetStateAction<string>>; // Function to set active button from parent
  activeButton: string; // The active button state passed down from parent
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ setActiveButton, activeButton }) => {
  
  const handleClick = (button: string) => {
    setActiveButton(button); // Call the parent handler
  };

  return (
    <div className={styles['button-group']}>
      <button
        onClick={() => handleClick('Real-Time News')}
        className={activeButton === 'Real-Time News' ? styles.active : ''}
      >
        Real-Time News
      </button>
      <span>||</span>
      <button
        onClick={() => handleClick('Financial Report')}
        className={activeButton === 'Financial Report' ? styles.active : ''}
      >
        Financial Report
      </button>
      <span>||</span>
      <button
        onClick={() => handleClick('Markets News')}
        className={activeButton === 'Markets News' ? styles.active : ''}
      >
        Markets News
      </button>
      <span>||</span>
      <button
        onClick={() => handleClick('Q&A Interview')}
        className={activeButton === 'Q&A Interview' ? styles.active : ''}
      >
        Q&A Interview
      </button>
      <span>||</span>
      <button
        onClick={() => handleClick('Retail Forum')}
        className={activeButton === 'Retail Forum' ? styles.active : ''}
      >
        Retail Forum
      </button>
    </div>
  );
};

export default ButtonGroup;
