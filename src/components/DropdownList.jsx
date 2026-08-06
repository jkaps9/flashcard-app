import styles from "./DropdownList.module.css";

export default function DropdownList({
  listItems,
  handleChange,
  selectedItems,
}) {
  return (
    <>
      <button
        type="button"
        className="btn"
        aria-expanded="false"
        id="categoryFilterButton"
      >
        All Categories
      </button>
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
    </>
  );
}
