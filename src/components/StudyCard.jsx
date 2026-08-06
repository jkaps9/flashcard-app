export default function StudyCard({
  id,
  question,
  answer,
  category,
  knownCount,
}) {
  const percentageComplete = (knownCount / 5) * 100;

  return (
    <div className="card flashcard">
      <div className="flashcard__header">
        <div className="tag">{category}</div>
      </div>
      <div className="flashcard__answer">
        <h3>{question}</h3>
        <p>Click to reveal answer</p>

        <p>Answer: </p>
        <p className="flashcard__answer-text">{answer}</p>
      </div>
      <div className="flashcard__footer">
        <div></div>
        <div className="footer__progress">
          <div
            className="progress__bar"
            style={{ "--progress": `${percentageComplete}%` }}
          ></div>
          <p className="progress__amount">{knownCount}/5</p>
        </div>
      </div>
    </div>
  );
}
