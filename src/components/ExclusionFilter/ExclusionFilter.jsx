import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedExclusions } from './exclusionFilterSlice';
import styles from './ExclusionFilter.module.css';
import { setSelectedLegendaries } from "../LegendaryFilter/legendaryFilterSlice";
import { setSelectedStarters } from "../StarterFilter/starterFilterSlice";
import { SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from '../../utils/index';

export const ExclusionFilter = () => {
    const dispatch = useDispatch();
    const selectedExclusions = useSelector((state) => state.exclusionFilter.selectedExclusions);

    const handleExclusionChange = (event) => {
        const exclusionGroup = event.target.value;
        const isChecked = event.target.checked;

        // Update the Redux state based on checkbox toggle
        let updatedExclusions = [...selectedExclusions];

        if (isChecked) {
            updatedExclusions.push(exclusionGroup); // Add exclusion if checked
            if (exclusionGroup === "Legendaries") {
                dispatch(setSelectedLegendaries([])); // Clear selected legendaries
            } else if (exclusionGroup === "Starters") {
                dispatch(setSelectedStarters([])); // Clear selected starters
            }
        } else {
            updatedExclusions = updatedExclusions.filter(exclusion => exclusion !== exclusionGroup); // Remove exclusion if unchecked
        }

        dispatch(setSelectedExclusions(updatedExclusions));
    };

    return (
        <div className={styles.filterContainer}>
            <p className={styles.filterLabel}>Exclusions</p>
            <div className={styles.checkboxContainer}>
                <label key="Favorites" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Favorites"
                        checked={selectedExclusions.includes("Favorites")}
                        onChange={handleExclusionChange}
                        className={styles.typeCheckbox}
                    />
                    Favorites
                </label>
                <label key="Starters" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Starters"
                        checked={selectedExclusions.includes("Starters")}
                        onChange={handleExclusionChange}
                        className={styles.typeCheckbox}
                    />
                    Starters
                </label>
                <label key="Legendaries" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Legendaries"
                        checked={selectedExclusions.includes("Legendaries")}
                        onChange={handleExclusionChange}
                        className={styles.typeCheckbox}
                    />
                    Legendaries
                </label>
            </div>
        </div>
    );
};

export default ExclusionFilter;
