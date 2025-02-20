import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLocks } from './lockedFilterSlice';
import styles from './LockedFilter.module.css';
//import { clearLocksFromExclusions } from '../ExclusionFilter/exclusionFilterSlice';
import { getLockedPokemon } from '../../features/favorites/favoritesSlice';

export const LockedFilter = () => {
    const dispatch = useDispatch();

    const lockedPokemon = useSelector(getLockedPokemon);

    // Local state to handle checkbox toggling
    const [isLocksChecked, setIsLocksChecked] = useState(false);

    const handleLockedChange = (event) => {
        if (!isLocksChecked) {
            // When Locks is checked, uncheck Locks And Evolutions
            setIsLocksChecked(true);

            // Only add Locks' IDs
            dispatch(setSelectedLocks(Object.keys(lockedPokemon).map(key => parseInt(key, 10))));
        } else {
            setIsLocksChecked(false);

            // Reset selected Locks
            dispatch(setSelectedLocks([]));
        }
    };

    return (
        <div className={styles.filterContainer}>
            <p className={styles.filterLabel}>Locked</p>
            <div className={styles.checkboxContainer}>
                <label key="Locked" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Locked"
                        checked={isLocksChecked}
                        onChange={handleLockedChange}
                        className={styles.typeCheckbox}
                    />
                    Locked
                </label>
            </div>
        </div>
    );
};

export default LockedFilter;
