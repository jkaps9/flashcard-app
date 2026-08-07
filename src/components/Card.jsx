import { useState } from "react";
import ActionMenu from "./ActionMenu";
import EditIcon from "../assets/icons/icon-edit.svg";
import DeleteIcon from "../assets/icons/icon-delete.svg";

export default function Card({
  id,
  question,
  answer,
  category,
  knownCount,
  onDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const percentageComplete = (knownCount / 5) * 100;

  const menuActions = [
    {
      label: "Edit Card",
      onClick: () => console.log("Editing", id),
      icon: EditIcon,
    },
    {
      label: "Delete Card",
      onClick: () => setIsDeleting(true),
      isDestructive: true,
      icon: DeleteIcon,
    },
  ];
  return (
    <>
      <div className="card flashcard">
        <div className="flashcard__header">
          <h2>{question}</h2>
        </div>

        <div className="flashcard__answer">
          <p>Answer: </p>
          <p className="flashcard__answer-text">{answer}</p>
        </div>
        <div className="flashcard__footer">
          <div className="tag-container">
            <div className="tag">{category}</div>
          </div>
          <div className="footer__progress">
            <div
              className="progress__bar"
              style={{ "--progress": `${percentageComplete}%` }}
            ></div>
            <p className="progress__amount">{knownCount}/5</p>
          </div>
          <ActionMenu
            actions={menuActions}
            ariaLabel={`Open actions menu`}
          ></ActionMenu>
        </div>
      </div>
      {isDeleting && (
        <div className="modal-overlay">
          <div className="card container modal-content">
            <h3>Are you sure you want to delete this card?</h3>
            <p>This action cannot be undone.</p>
            <div className="buttons" style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                className="btn"
                onClick={() => setIsDeleting(false)}
                autofocus
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
