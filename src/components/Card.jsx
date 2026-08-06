import MenuIcon from "../assets/icons/icon-menu.svg";

export default function Card({
  id,
  question,
  answer,
  category,
  knownCount,
  onDelete,
}) {
  const percentageComplete = (knownCount / 5) * 100;
  return (
    <div className="card flashcard">
      <div className="flashcard__header">
        <h3>{question}</h3>
      </div>

      <div className="flashcard__answer">
        <p>Answer: </p>
        <p className="flashcard__answer-text">{answer}</p>
      </div>
      <div className="flashcard__footer">
        <div>
          <div className="tag">{category}</div>
        </div>
        <div className="footer__progress">
          <div
            className="progress__bar"
            style={{ "--progress": `${percentageComplete}%` }}
          ></div>
          <p className="progress__amount">{knownCount}/5</p>
        </div>
        <div className="footer__buttons">
          <button
            id="menu-trigger"
            className="flashcard__menu-btn"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu-popup"
            aria-label="Actions"
          >
            <img src={MenuIcon} aria-hidden="true" />
            <span className="sr-only">Toggle Menu</span>
          </button>

          <ul id="menu-popup" role="menu" aria-labelledby="menu-trigger" hidden>
            <li role="none">
              <button role="menuitem" tabindex="-1" id="action-edit">
                Edit
              </button>
            </li>
            <li role="none">
              <button
                role="menuitem"
                tabindex="-1"
                id="action-delete"
                className="delete-btn"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
