import React from "react";

// Redux + React Query
import { useDispatch, useSelector } from "react-redux";
import { selectRegion, setRegion } from "../../features/regions/regionsSlice";

// Styles
import styles from "./ChooseARegion.module.css";

// Other
import { Regions } from "../../utils";

const ChooseARegion = () => {
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectRegion);

  const handleSelect = ({ target }) => {
    dispatch(setRegion(target.value));
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor="region-select" className={styles.label}>
        Choose a region:
      </label>
      <select
        name="regions"
        id="region-select"
        value={selectedRegion}
        onChange={handleSelect}
        className={styles.select}
      >
        {Object.keys(Regions).map((regionName) => (
          <option key={regionName} value={regionName}>
            {regionName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChooseARegion;
