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
  const percentageComplete = (knownCount / 5) * 100;

  const menuActions = [
    {
      label: "Edit Card",
      onClick: () => console.log("Editing", id),
      icon: EditIcon,
    },
    {
      label: "Delete Card",
      onClick: () => onDelete(id),
      isDestructive: true,
      icon: DeleteIcon,
    },
  ];
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
  );
}
