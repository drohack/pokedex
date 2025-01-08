import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStarters } from './starterFilterSlice';
import styles from './StarterFilter.module.css';
import { clearStartersFromExclusions } from '../ExclusionFilter/exclusionFilterSlice';
import { Starters, StartersAndEvolutions } from '../../utils/index';

export const StarterFilter = () => {
    const dispatch = useDispatch();

    // Get selected starters from Redux state
    const selectedStarters = useSelector((state) => state.starterFilter.selectedStarters);

    // Local state to handle checkbox toggling
    const [isStartersChecked, setIsStartersChecked] = useState(false);
    const [isStartersAndEvolutionsChecked, setIsStartersAndEvolutionsChecked] = useState(false);

    // Update checkboxes if selectedStarters is empty or not
    useEffect(() => {
        if (selectedStarters.length === 0) {
            setIsStartersChecked(false);
            setIsStartersAndEvolutionsChecked(false);
        } else {
            const starterIDs = Object.values(Starters).map((p) => p.id);
            const starterAndEvolutionIDs = Object.values(StartersAndEvolutions).map((p) => p.id);
            if (selectedStarters.every((id) => starterIDs.includes(id))) {
                setIsStartersChecked(true);
                setIsStartersAndEvolutionsChecked(false);
            } else if (selectedStarters.every((id) => starterAndEvolutionIDs.includes(id))) {
                setIsStartersChecked(false);
                setIsStartersAndEvolutionsChecked(true);
            }
        }
    }, [selectedStarters]);

    const handleStarterChange = (event) => {
        const starterGroup = event.target.value;

        // Clear legendaries from exclusions if any are selected
        if (event.target.checked) {
            dispatch(clearStartersFromExclusions());
        }

        if (starterGroup === 'Starters') {
            if (!isStartersChecked) {
                // When Starters is checked, uncheck Starters And Evolutions
                setIsStartersChecked(true);
                setIsStartersAndEvolutionsChecked(false);

                // Only add Starters' IDs
                dispatch(setSelectedStarters(Object.values(Starters).map((p) => p.id)));
            } else {
                setIsStartersChecked(false);
                setIsStartersAndEvolutionsChecked(false);

                // Reset selected starters
                dispatch(setSelectedStarters([]));
            }
        } else if (starterGroup === 'StartersAndEvolutions') {
            if (!isStartersAndEvolutionsChecked) {
                // When Starters and Evolutions is checked, uncheck Starters
                setIsStartersChecked(false);
                setIsStartersAndEvolutionsChecked(true);

                // Add both Starters and Evolutions' IDs
                dispatch(setSelectedStarters(Object.values(StartersAndEvolutions).map((p) => p.id)));
            } else {
                setIsStartersChecked(false);
                setIsStartersAndEvolutionsChecked(false);

                // Reset selected starters
                dispatch(setSelectedStarters([]));
            }
        }
    };

    return (
        <div className={styles.filterContainer}>
            <p className={styles.filterLabel}>Starters</p>
            <div className={styles.checkboxContainer}>
                <label key="Starters" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Starters"
                        checked={isStartersChecked}
                        onChange={handleStarterChange}
                        className={styles.typeCheckbox}
                    />
                    Starters
                </label>
                <label key="StartersAndEvolutions" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="StartersAndEvolutions"
                        checked={isStartersAndEvolutionsChecked}
                        onChange={handleStarterChange}
                        className={styles.typeCheckbox}
                    />
                    Starters And Evolutions
                </label>
            </div>
        </div>
    );
};

export default StarterFilter;
