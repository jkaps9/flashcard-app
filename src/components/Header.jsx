import LogoSmall from "../assets/icons/logo-small.svg";
import LogoLarge from "../assets/icons/logo-large.svg";

export default function Header({ onChange }) {
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
          <button className="btn btn--secondary mode-toggle" onClick={onChange}>
            <span>Study Mode</span>
            <span className="active">All Cards</span>
          </button>
        </div>
      </div>
    </header>
  );
}
