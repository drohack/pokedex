import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTypes } from './typeFilterSlice';
import styles from './TypeFilter.module.css';
import { typeColors } from '../../utils';
import { clearTypeFromExclusions } from '../ExclusionFilter/exclusionFilterSlice';

export const TypeFilter = () => {
    const dispatch = useDispatch();
    const selectedTypes = useSelector((state) => state.typeFilter.selectedTypes);

    const handleTypeChange = (event) => {
        const type = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            dispatch(clearTypeFromExclusions(type)); // Dispatch action to clear type from exclusions
        }

        const updatedSelectedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter((t) => t !== type)
            : [...selectedTypes, type];

        dispatch(setSelectedTypes(updatedSelectedTypes)); // Dispatch action to update Redux state
    };

    return (
        <div className={styles.filterContainer}>
            <p className={styles.filterLabel}>Types</p>
            <div className={styles.checkboxContainer}>
                {Object.keys(typeColors).map((type) => (
                    <label key={type} className={styles.typeLabel} style={{ backgroundColor: typeColors[type] }}>
                        <input
                            type="checkbox"
                            value={type}
                            checked={selectedTypes.includes(type)}
                            onChange={handleTypeChange}
                            className={styles.typeCheckbox}
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default TypeFilter;
