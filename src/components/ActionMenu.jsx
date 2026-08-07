import { useState, useEffect, useRef } from "react";
import MenuIcon from "../assets/icons/icon-menu.svg";
import styles from "./ActionMenu.module.css";

export default function ActionMenu({
  actions,
  ariaLabel = "Open options menu",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);
  const wasOpen = useRef(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
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
      wasOpen.current = true;
    } else if (!isOpen && wasOpen.current && buttonRef.current) {
      // Return focus to the trigger button when closed
      buttonRef.current.focus();
      wasOpen.current = false;
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
      const nextIndex = (index + 1) % actions.length;
      itemRefs.current[nextIndex]?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + actions.length) % actions.length;
      itemRefs.current[prevIndex]?.focus();
    }
  };

  const handleActionSelect = (onClick) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="action-menu" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.actionMenuTrigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
      >
        <img src={MenuIcon} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={styles.actionMenuDropdown}
          role="menu"
          aria-orientation="vertical"
        >
          {actions.map((action, index) => (
            <div>
              <button
                key={action.label}
                ref={(el) => (itemRefs.current[index] = el)}
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={`action-menu-item ${action.isDestructive ? "destructive" : ""}`}
                onClick={() => handleActionSelect(action.onClick)}
                onKeyDown={(e) => handleMenuKeyDown(e, index)}
              >
                {action.icon && (
                  <img src={action.icon} aria-hidden="true"></img>
                )}
                {action.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
