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
        <div className="tag">{category}</div>
        <div className="footer__progress">
          <div
            className="progress__bar"
            style={{ "--progress": `${percentageComplete}%` }}
          ></div>
          <p className="progress__amount">{knownCount}/5</p>
        </div>
        <div className="footer__buttons">
          <button className="flashcard__menu-button">...</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
