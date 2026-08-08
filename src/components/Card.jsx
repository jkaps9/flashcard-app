import { useState, useRef } from "react";
import ActionMenu from "./ActionMenu";
import EditIcon from "../assets/icons/icon-edit.svg";
import DeleteIcon from "../assets/icons/icon-delete.svg";
import CloseIcon from "../assets/icons/icon-cross.svg";
import CardForm from "./CardForm";

export default function Card({ card, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const percentageComplete = (card.knownCount / 5) * 100;
  const actionTriggerRef = useRef(null);

  const closeEditModal = () => {
    setIsEditing(false);
    actionTriggerRef.current?.focus();
  };

  const closeDeleteModal = () => {
    setIsDeleting(false);
    actionTriggerRef.current?.focus();
  };
  const menuActions = [
    {
      label: "Edit Card",
      onClick: () => setIsEditing(true),
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
          <h2>{card.question}</h2>
        </div>

        <div className="flashcard__answer">
          <p>Answer: </p>
          <p className="flashcard__answer-text">{card.answer}</p>
        </div>
        <div className="flashcard__footer">
          <div className="tag-container">
            <div className="tag">{card.category}</div>
          </div>
          <div className="footer__progress">
            <div
              className="progress__bar"
              style={{ "--progress": `${percentageComplete}%` }}
            ></div>
            <p className="progress__amount">{card.knownCount}/5</p>
          </div>
          <ActionMenu
            triggerRef={actionTriggerRef}
            actions={menuActions}
            ariaLabel={`Open actions menu`}
          ></ActionMenu>
        </div>
      </div>
      {isDeleting && (
        <div className="modal-overlay">
          <div
            className="card modal-content"
            aria-modal="true"
            aria-label="delete card"
            role="dialog"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                closeDeleteModal();
              }
            }}
          >
            <div className="modal__text">
              <h3>Delete this card?</h3>
              <p>This action can't be undone.</p>
            </div>
            <div
              className="modal__buttons"
              style={{ display: "flex", gap: "1rem" }}
            >
              <button
                type="button"
                className="btn btn--border"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => onDelete(card.id)}
                autoFocus
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="modal-overlay">
          <div
            className="card modal-content"
            aria-modal="true"
            aria-label="edit card"
            role="dialog"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                closeEditModal();
              }
            }}
          >
            <CardForm
              initialState={{
                question: card.question,
                answer: card.answer,
                category: card.category,
              }}
              onSubmit={(formData) => {
                onEdit(card.id, formData);
                closeEditModal();
              }}
              buttonText="Update Card"
            >
              <h2>Edit your card</h2>
              <button
                type="button"
                className="close-btn"
                onClick={closeEditModal}
              >
                <img src={CloseIcon} alt="" aria-hidden="true" />
                <span className="sr-only">Close Modal</span>
              </button>
            </CardForm>
          </div>
        </div>
      )}
    </>
  );
}
