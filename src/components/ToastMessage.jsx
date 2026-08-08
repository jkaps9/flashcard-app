import { useState } from "react";
import CloseIcon from "../assets/icons/icon-cross.svg";

export default function ToastMessage({ text }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible ? (
        <div className="toast row">
          <p> {text}</p>
          <button
            type="button"
            className="close-btn"
            onClick={() => setIsVisible(false)}
          >
            <img src={CloseIcon} alt="" aria-hidden="true" />
            <span className="sr-only">Close Toast</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
