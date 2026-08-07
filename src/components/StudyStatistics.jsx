import "./StudyStatistics.css";
import TotalIcon from "../assets/icons/icon-stats-total.svg";
import MasteredIcon from "../assets/icons/icon-stats-mastered.svg";
import InProgressIcon from "../assets/icons/icon-stats-in-progress.svg";
import NotStartedIcon from "../assets/icons/icon-stats-not-started.svg";

export default function StudyStatistics({ cards }) {
  const totalCards = cards.length;
  const masteredCards = cards.filter((card) => card.knownCount === 5).length;
  const inProgressCards = cards.filter(
    (card) => card.knownCount < 5 && card.knownCount > 0,
  ).length;
  const notStartedCards = cards.filter((card) => card.knownCount === 0).length;
  return (
    <div className="card stat-section">
      <h2>Study Statistics</h2>
      <ul className="stats-card-list">
        <li className="stats-card">
          <div className="stats-card__content">
            <h3>Total Cards</h3>
            <p>{totalCards}</p>
          </div>
          <div className="stats-card__icon bg-blue">
            <img src={TotalIcon} alt="" aria-hidden="true" />
          </div>
        </li>
        <li className="stats-card">
          <div className="stats-card__content">
            <h3>Mastered</h3>
            <p>{masteredCards}</p>
          </div>
          <div className="stats-card__icon bg-teal">
            <img src={MasteredIcon} alt="" aria-hidden="true" />
          </div>
        </li>
        <li className="stats-card">
          <div className="stats-card__content">
            <h3>In Progress</h3>
            <p>{inProgressCards}</p>
          </div>
          <div className="stats-card__icon bg-pink-bright">
            <img src={InProgressIcon} alt="" aria-hidden="true" />
          </div>
        </li>
        <li className="stats-card">
          <div className="stats-card__content">
            <h3>Not Started</h3>
            <p>{notStartedCards}</p>
          </div>
          <div className="stats-card__icon bg-pink">
            <img src={NotStartedIcon} alt="" aria-hidden="true" />
          </div>
        </li>
      </ul>
    </div>
  );
}
