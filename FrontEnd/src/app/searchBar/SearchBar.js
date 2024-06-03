import React from 'react';
import styles from './SearchBar.module.css';
import { IoSearch } from 'react-icons/io5';

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <button className={styles.searchButton}>
        <IoSearch className={styles.searchIcon} />
      </button>
      <input 
        type="text" 
        className={styles.searchInput} 
        placeholder=" Search Company" 
      />
    </div>
  );
}
