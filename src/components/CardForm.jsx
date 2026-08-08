import { useState } from "react";

export default function CardForm({
  initialState = { question: "", answer: "", category: "" },
  onSubmit,
  children,
  buttonText,
}) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      {children}
      <div className="input-group">
        <label htmlFor="question">Question</label>
        <input
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="e.g., What is the capital of France?"
        />
      </div>
      <div className="input-group">
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="e.g., Paris"
          rows={3}
        />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Geography"
        />
      </div>
      <button type="submit" className="btn btn--primary">
        {buttonText}
      </button>
    </form>
  );
}
