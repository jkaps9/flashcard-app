export default function Card({
  id,
  question,
  answer,
  category,
  knownCount,
  onDelete,
}) {
  return (
    <div className="card">
      <h3>{question}</h3>
      <p>{answer}</p>
      <div className="category-badge">
        <span>{category}</span>
      </div>
      <div className="footer__progress">
        <div className="progress__bar">
          <span>{(knownCount / 5) * 100}%</span>
        </div>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
