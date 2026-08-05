import LogoSmall from "../assets/icons/logo-small.svg";
import LogoLarge from "../assets/icons/logo-large.svg";

export default function Header() {
  return (
    <header>
      <div class="container">
        <div class="navbar">
          <a
            href="{{ '/' | url }}"
            class="logo"
            aria-label="{{ site.name }} - home"
          >
            <div class="logo-small">
              <img src={LogoSmall} alt="site logo" />
            </div>
            <div class="logo-large">
              <img src={LogoLarge} alt="site logo" />
            </div>
          </a>
          <div class="btn btn--secondary mode-toggle">
            <button id="study-mode">Study Mode</button>
            <button id="all-cards" class="active">
              All Cards
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
