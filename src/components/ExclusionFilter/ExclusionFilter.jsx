import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedExclusions } from './exclusionFilterSlice';
import styles from './ExclusionFilter.module.css';
import { setSelectedLegendaries } from "../LegendaryFilter/legendaryFilterSlice";
import { setSelectedStarters } from "../StarterFilter/starterFilterSlice";
import { setSelectedTypes } from '../TypeFilter/typeFilterSlice';
import { typeColors, SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from '../../utils/index';

export const ExclusionFilter = () => {
    const dispatch = useDispatch();
    const selectedExclusions = useSelector((state) => state.exclusionFilter.selectedExclusions);
    const selectedTypes = useSelector((state) => state.typeFilter?.selectedTypes || []);

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
            } else if (exclusionGroup === "Favorites") {
                // Do nothing
            } else {
                // Remove the type from selected types
                dispatch(setSelectedTypes(selectedTypes.filter(type => type !== exclusionGroup)));
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
            <div>
                <p className={styles.filterLabel}>Exclude Types</p>
                <div className={styles.typeCheckboxContainer}>
                    {Object.keys(typeColors).map((type) => (
                        <label key={type} className={styles.typeLabel} style={{ backgroundColor: typeColors[type] }}>
                            <input
                                type="checkbox"
                                value={type}
                                checked={selectedExclusions.includes(type)}
                                onChange={handleExclusionChange}
                                className={styles.typeCheckbox}
                            />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExclusionFilter;
