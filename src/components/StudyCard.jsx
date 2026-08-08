import { useState, useRef, useEffect } from "react";
import "./StudyCard.css";

export default function StudyCard({
  id,
  question,
  answer,
  category,
  knownCount,
  handleNext,
  handlePrevious,
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [id]);

  const percentageComplete = (knownCount / 5) * 100;
  const toggleVisibility = () => {
    setIsAnswerVisible((prev) => !prev);
  };
  return (
    <div
      ref={cardRef}
      key={id}
      className={`card study-card__inner ${isAnswerVisible ? "answer-visible" : ""}`}
      onClick={() => {
        toggleVisibility();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleVisibility();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrevious();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }}
      tabindex="0"
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
