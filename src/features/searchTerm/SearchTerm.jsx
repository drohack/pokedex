import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm, clearSearchTerm } from "./searchTermSlice";
import styles from './SearchTerm.module.css'

const SearchTerm = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);

    const handleSearchTermChange = ({target}) => {
        dispatch(setSearchTerm(target.value))
    }

    const handleClearSearchTerm = () => {
        dispatch(clearSearchTerm());
    }

    return (
        <div className={styles.searchContainer}>
            <input
                type='text'
                placeholder='Search Pokemon...'
                value={searchTerm}
                onChange={handleSearchTermChange}
                className={styles.searchInput}
            />
            {searchTerm && (
                <button className={styles.clearButton} onClick={handleClearSearchTerm}>x</button>
            )}
        </div>
    )
}

export default SearchTerm;