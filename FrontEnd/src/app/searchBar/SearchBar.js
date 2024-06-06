import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { IoSearch } from 'react-icons/io5';
import Fuse from 'fuse.js';
import companies from './ConstCompanies.js';

const fuse = new Fuse(companies, {
  keys: ['name', 'alias'],
  includeScore: true,
  threshold: 0.3, // Adjust for sensitivity
});

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [mostMatchedCompany, setMostMatchedCompany] = useState(null);
  
    const handleSearch = () => {
      const result = fuse.search(query);
      const mostMatchedItem = result.reduce((acc, cur) => {
        if (!acc || cur.score < acc.score) {
          return cur.item;
        }
        return acc;
      }, null);
      setMostMatchedCompany(mostMatchedItem);
      console.log('Most matched company:', mostMatchedItem);  //Item is object {symbol, name, alias}
    };
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
  
    return (
      <div className={styles.searchContainer}>
        <button type="button" className={styles.searchButton} onClick={handleSearch}>
          <IoSearch className={styles.searchIcon} />
        </button>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder=" Search Company" 
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    );
  }
  