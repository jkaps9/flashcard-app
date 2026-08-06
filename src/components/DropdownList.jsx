import { useState } from "react";
import styles from "./DropdownList.module.css";

export default function DropdownList({
  listItems,
  handleChange,
  selectedItems,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn"
        aria-expanded={isOpen}
        id="categoryFilterButton"
        onClick={() => setIsOpen(!isOpen)}
      >
        All Categories
      </button>
      {isOpen && (
        <fieldset className={styles.dropdownList}>
          {listItems.map((category) => (
            <div key={category.name}>
              <input
                type="checkbox"
                id={category.name}
                name="category"
                value={category.name}
                checked={selectedItems.includes(category.name)}
                onChange={handleChange}
              />
              <label htmlFor={category.name}>
                {category.name} ({category.count})
              </label>
            </div>
          ))}
        </fieldset>
      )}
    </>
  );
}
