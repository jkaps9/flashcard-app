export default function CardForm({
  question,
  updateQuestion,
  answer,
  updateAnswer,
  category,
  updateCategory,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="input-group">
        <label htmlFor="question">Question</label>
        <input
          id="question"
          name="question"
          value={question}
          onChange={(e) => updateQuestion(e.target.value)}
          placeholder="e.g., What is the capital of France?"
        />
      </div>
      <div className="input-group">
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          name="answer"
          value={answer}
          onChange={(e) => updateAnswer(e.target.value)}
          placeholder="e.g., Paris"
          rows={3}
        />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={category}
          onChange={(e) => updateCategory(e.target.value)}
          placeholder="e.g., Geography"
        />
      </div>
      <button type="submit" className="btn btn--primary">
        Create Card
      </button>
    </form>
  );
}
