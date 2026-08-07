import styles from "./CardManager.module.css";

import DropdownList from "./DropdownList";
import ShuffleIcon from "../assets/icons/icon-shuffle.svg";
export default function Filters({
  categoriesWithCounts,
  selectedCategories,
  handleCategoryChange,
  handleShuffle,
  isHideMastered,
  handleMasteredCheck,
}) {
  return (
    <div className={styles.filterRow}>
      <div className={styles.cardFilters}>
        <div className="category-filter">
          <DropdownList
            listItems={categoriesWithCounts}
            selectedItems={selectedCategories}
            handleChange={handleCategoryChange}
          ></DropdownList>
        </div>
        <div className={styles.masteredFilter}>
          <input
            type="checkbox"
            id="hideMastered"
            name="hideMastered"
            value="hide-mastered"
            checked={isHideMastered}
            onChange={handleMasteredCheck}
          />
          <label htmlFor="hideMastered">Hide Mastered</label>
        </div>
      </div>
      <button className="btn btn--border" type="button" onClick={handleShuffle}>
        <img src={ShuffleIcon} alt="" aria-hidden="true"></img>
        Shuffle
      </button>
    </div>
  );
}
