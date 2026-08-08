import { useEffect } from "react";
import CloseIcon from "../assets/icons/icon-cross.svg";

export default function ToastMessage({ text, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast row">
      <p> {text}</p>
      <button type="button" className="close-btn" onClick={onClose}>
        <img src={CloseIcon} alt="" aria-hidden="true" />
        <span className="sr-only">Close Toast</span>
      </button>
    </div>
  );
}
