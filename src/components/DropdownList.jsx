import { useState, useEffect, useRef } from "react";
import styles from "./DropdownList.module.css";
import ChevronDown from "../assets/icons/icon-chevron-down.svg";

export default function DropdownList({
  listItems,
  handleChange,
  selectedItems,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && itemRefs.current[0]) {
      itemRefs.current[0].focus();
    } else if (!isOpen && buttonRef.current) {
      // Return focus to the trigger button when closed
      buttonRef.current.focus();
    }
  }, [isOpen]);

  const handleButtonKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleMenuKeyDown = (e, index) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % listItems.length;
      itemRefs.current[nextIndex]?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + listItems.length) % listItems.length;
      itemRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="btn"
        aria-expanded={isOpen}
        id="categoryFilterButton"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
      >
        All Categories
        <img src={ChevronDown} alt="" aria-hidden="true"></img>
      </button>
      {isOpen && (
        <fieldset ref={menuRef} className={styles.dropdownList}>
          {listItems.map((category, index) => (
            <div key={category.name}>
              <input
                ref={(el) => (itemRefs.current[index] = el)}
                type="checkbox"
                id={category.name}
                name="category"
                value={category.name}
                checked={selectedItems.includes(category.name)}
                onChange={handleChange}
                onKeyDown={(e) => handleMenuKeyDown(e, index)}
              />
              <label htmlFor={category.name}>
                {category.name} ({category.count})
              </label>
            </div>
          ))}
        </fieldset>
      )}
    </div>
  );
}
