import styles from "./SearchTerm.module.css";

const SearchTerm = ({ searchTerm, onSearchChange }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={onSearchChange}
        className={styles.searchInput}
      />
      {searchTerm && (
        <button
          className={styles.clearButton}
          onClick={() => onSearchChange({ target: { value: "" } })}
        >
          x
        </button>
      )}
    </div>
  );
};

export default SearchTerm;
