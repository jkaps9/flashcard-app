import { useState } from "react";
import "./StudyCard.css";

export default function StudyCard({
  id,
  question,
  answer,
  category,
  knownCount,
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const percentageComplete = (knownCount / 5) * 100;

  return (
    <div
      key={id}
      className="card study-card__inner"
      onClick={() => {
        setIsAnswerVisible((prev) => !prev);
      }}
    >
      <div className="tag">{category}</div>

      <div className="inner__text">
        {!isAnswerVisible ? (
          <>
            <h1>{question}</h1>
            <p className="inner__text--helper">Click to reveal answer</p>
          </>
        ) : (
          <>
            <p className="inner__text--helper">Answer:</p>
            <p className="inner__text--answer">{answer}</p>
          </>
        )}
      </div>

      <div className="inner__progress">
        <div
          className="progress__bar"
          style={{ "--progress": `${percentageComplete}%` }}
        ></div>
        <p className="progress__amount">{knownCount}/5</p>
      </div>
    </div>
  );
}
