import LogoSmall from "../assets/icons/logo-small.svg";
import LogoLarge from "../assets/icons/logo-large.svg";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="navbar">
          <a
            href="{{ '/' | url }}"
            className="logo"
            aria-label="{{ site.name }} - home"
          >
            <div className="logo-small">
              <img src={LogoSmall} alt="site logo" />
            </div>
            <div className="logo-large">
              <img src={LogoLarge} alt="site logo" />
            </div>
          </a>
          <div className="btn btn--secondary mode-toggle">
            <button id="study-mode">Study Mode</button>
            <button id="all-cards" className="active">
              All Cards
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
