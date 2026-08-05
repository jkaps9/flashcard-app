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
      <h3 className="flashcard__header">{question}</h3>

      <div className="flashcard__answer">
        <p>Answer: </p>
        <p className="flashcard__answer-text">{answer}</p>
      </div>

      <div className="btn btn--secondary category-badge">{category}</div>

      <div className="flashcard__footer">
        <div className="footer__progress">
          <div
            className="progress__bar"
            style={{ "--progress": `${percentageComplete}%` }}
          ></div>
          <p className="progress__amount">{knownCount}/5</p>
        </div>
        <button className="flashcard__menu-button">...</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}
