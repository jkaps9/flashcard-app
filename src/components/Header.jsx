import LogoSmall from "../assets/icons/logo-small.svg";
import LogoLarge from "../assets/icons/logo-large.svg";
import "./Header.css";

export default function Header({ toggled, onChange }) {
  return (
    <header>
      <div className="container">
        <div className="navbar">
          <a
            href={`${import.meta.env.BASE_URL}`}
            className="logo"
            aria-label="Flashcards home"
          >
            <div className="logo-small">
              <img src={LogoSmall} alt="Flashcards site logo" />
            </div>
            <div className="logo-large">
              <img src={LogoLarge} alt="Flashcards site logo" />
            </div>
          </a>
          <button className="btn btn--secondary mode-toggle" onClick={onChange}>
            <span className={toggled ? "active" : undefined}>Study Mode</span>
            <span className={!toggled ? "active" : undefined}>All Cards</span>
          </button>
        </div>
      </div>
    </header>
  );
}
