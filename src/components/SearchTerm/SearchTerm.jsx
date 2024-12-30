import React from 'react';
import styles from './SearchTerm.module.css';
import { useDispatch } from 'react-redux';
import { clearSearchTerm } from './searchTermSlice';
import { FaTimes } from 'react-icons/fa';

const SearchTerm = ({ searchTerm, onSearchChange }) => {
    const dispatch = useDispatch();

    const handleClearSearchTerm = () => {
        dispatch(clearSearchTerm());
    }

    return (
      <div className={styles.searchContainer}>
          <input
              type="text"
              placeholder='Search Pokemon...'
              value={searchTerm}
              onChange={onSearchChange}
              className={styles.searchInput}
          />
          {searchTerm && (
              <button className={styles.clearButton} onClick={handleClearSearchTerm}>
                  <FaTimes /> {/* Use the icon component */}
              </button>
          )}
      </div>
  )
}

export default SearchTerm;