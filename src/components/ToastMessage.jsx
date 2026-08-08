import { useEffect, useRef } from "react";
import CloseIcon from "../assets/icons/icon-cross.svg";

export default function ToastMessage({ text, onClose }) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
