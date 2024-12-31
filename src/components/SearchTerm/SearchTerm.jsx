import React from 'react';
import styles from './SearchTerm.module.css';
import { useDispatch } from 'react-redux';
import { setSearchTerm, clearSearchTerm } from './searchTermSlice';
import { FaTimes } from 'react-icons/fa';

const SearchTerm = ({ searchTerm }) => {
    const dispatch = useDispatch();

    const handleSearchChange = ({ target }) => {
        dispatch(setSearchTerm(target.value));
    };

    const handleClearSearchTerm = () => {
        dispatch(clearSearchTerm());
    }

    return (
      <div className={styles.searchContainer}>
          <input
              type="text"
              id='pokemon-search'
              name='pokemon-search'
              placeholder='Search Pokemon...'
              value={searchTerm}
              onChange={handleSearchChange}
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