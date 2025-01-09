import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPseudoLegendaries } from './pseudoLegendaryFilterSlice';
import styles from './PseudoLegendaryFilter.module.css';
import {PseudoLegendaries } from '../../utils/index';

export const PseudoLegendaryFilter = () => {
    const dispatch = useDispatch();

    // Convert objects to arrays of IDs
    const pseudoPseudoLegendariesIDs = Object.values(PseudoLegendaries).map((p) => p.id);

    const handlePseudoLegendaryChange = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            dispatch(setSelectedPseudoLegendaries(pseudoPseudoLegendariesIDs));
        } else {
            dispatch(setSelectedPseudoLegendaries([]));
        }
    };

    return (
        <div className={styles.filterContainer}>
            <p className={styles.filterLabel}>Pseudo Legendaries</p>
            <div className={styles.checkboxContainer}>
                <label key="PseudoLegendaries" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="PseudoLegendaries"
                        onChange={handlePseudoLegendaryChange}
                        className={styles.typeCheckbox}
                    />
                    Pseudo Legendaries
                </label>
            </div>
        </div>
    );
};

export default PseudoLegendaryFilter;
