import { useState } from "react";
import CloseIcon from "../assets/icons/icon-cross.svg";

export default function ToastMessage({ text }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible ? (
        <div className="toast">
          <p> {text}</p>
          <button type="button" onClick={() => setIsVisible(false)}>
            <img src={CloseIcon} alt="" aria-hidden="true" />
            <span className="sr-only">Close Toast</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
