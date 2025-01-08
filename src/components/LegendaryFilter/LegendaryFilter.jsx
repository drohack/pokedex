import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLegendaries } from './legendaryFilterSlice';
import styles from './LegendaryFilter.module.css';
import { clearLegendariesFromExclusions } from '../ExclusionFilter/exclusionFilterSlice';
import { SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from '../../utils/index';

export const LegendaryFilter = () => {
    const dispatch = useDispatch();
    const selectedLegendaries = useSelector((state) => state.legendaryFilter.selectedLegendaries);

    // Convert objects to arrays of IDs
    const pseudoLegendariesIDs = Object.values(PseudoLegendaries).map((p) => p.id);
    const subLegendariesIDs = Object.values(SubLegendaries).map((p) => p.id);
    const legendariesIDs = Object.values(Legendaries).map((p) => p.id);
    const mythicalIDs = Object.values(Mythical).map((p) => p.id);

    const handleLegendaryChange = (event) => {
        const legendaryGroup = event.target.value;

        // Clear legendaries from exclusions if any are selected
        if (event.target.checked) {
            dispatch(clearLegendariesFromExclusions());
        }

        // Determine which list of IDs to add/remove
        let idsToToggle = [];
        if (legendaryGroup === 'PseudoLegendaries') idsToToggle = pseudoLegendariesIDs;
        else if (legendaryGroup === 'SubLegendaries') idsToToggle = subLegendariesIDs;
        else if (legendaryGroup === 'Legendaries') idsToToggle = legendariesIDs;
        else if (legendaryGroup === 'Mythical') idsToToggle = mythicalIDs;

        // Check if the entire group is selected
        const groupIsSelected = idsToToggle.every((id) => selectedLegendaries.includes(id));

        // Update selectedLegendaries based on the toggle action
        const updatedSelectedLegendaries = groupIsSelected
            ? selectedLegendaries.filter((id) => !idsToToggle.includes(id)) // Remove only this group's IDs
            : [...selectedLegendaries, ...idsToToggle]; // Add this group's IDs

        dispatch(setSelectedLegendaries(updatedSelectedLegendaries)); // Update Redux state
    };

    const handleSelectAll = () => {
        // Combine all IDs
        const allIDs = [
            ...pseudoLegendariesIDs,
            ...subLegendariesIDs,
            ...legendariesIDs,
            ...mythicalIDs,
        ];

        // Select all or deselect all
        if (selectedLegendaries.length === allIDs.length) {
            dispatch(setSelectedLegendaries([])); // Deselect all
        } else {
            // Clear legendaries from exclusions if any are selected
            dispatch(clearLegendariesFromExclusions());
            dispatch(setSelectedLegendaries(allIDs)); // Select all
        }
    };

    return (
        <div className={styles.filterContainer}>
            <p className={styles.filterLabel}>Legendaries</p>
            <div className={styles.checkboxContainer}>
                <label key="SelectAll" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="SelectAll"
                        checked={
                            selectedLegendaries.length ===
                            pseudoLegendariesIDs.length +
                                subLegendariesIDs.length +
                                legendariesIDs.length +
                                mythicalIDs.length
                        }
                        onChange={handleSelectAll}
                        className={styles.typeCheckbox}
                    />
                    Select All
                </label>
                <label key="PseudoLegendaries" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="PseudoLegendaries"
                        checked={pseudoLegendariesIDs.every((id) => selectedLegendaries.includes(id))}
                        onChange={handleLegendaryChange}
                        className={styles.typeCheckbox}
                    />
                    Pseudo Legendaries
                </label>
                <label key="SubLegendaries" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="SubLegendaries"
                        checked={subLegendariesIDs.every((id) => selectedLegendaries.includes(id))}
                        onChange={handleLegendaryChange}
                        className={styles.typeCheckbox}
                    />
                    Sub Legendaries
                </label>
                <label key="Legendaries" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Legendaries"
                        checked={legendariesIDs.every((id) => selectedLegendaries.includes(id))}
                        onChange={handleLegendaryChange}
                        className={styles.typeCheckbox}
                    />
                    Legendaries
                </label>
                <label key="Mythical" className={styles.typeLabel}>
                    <input
                        type="checkbox"
                        value="Mythical"
                        checked={mythicalIDs.every((id) => selectedLegendaries.includes(id))}
                        onChange={handleLegendaryChange}
                        className={styles.typeCheckbox}
                    />
                    Mythical
                </label>
            </div>
        </div>
    );
};

export default LegendaryFilter;
