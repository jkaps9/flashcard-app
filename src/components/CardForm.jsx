import { useState } from "react";
import ErrorIcon from "../assets/icons/icon-error.svg";

export default function CardForm({
  initialState = { question: "", answer: "", category: "" },
  onSubmit,
  children,
  buttonText,
}) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    questionError: "",
    answerError: "",
    categoryError: "",
    formError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      questionError: "",
      answerError: "",
      categoryError: "",
      formError: "",
    };

    if (formData.question === "") {
      newErrors.questionError = "Please enter a question.";
      isValid = false;
    }
    if (formData.answer === "") {
      newErrors.answerError = "Please enter a answer.";
      isValid = false;
    }
    if (formData.category === "") {
      newErrors.categoryError = "Please enter a category.";
      isValid = false;
    }

    if (
      formData.question === initialState.question &&
      formData.answer === initialState.answer &&
      formData.category === initialState.category &&
      isValid
    ) {
      newErrors.formError = "Nothing changed";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData(initialState);
    }
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
        {errors.questionError && (
          <div className="error-message">
            <img src={ErrorIcon} alt="" aria-hidden="true" />
            <p>{errors.questionError}</p>
          </div>
        )}
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
        {errors.answerError && (
          <div className="error-message">
            <img src={ErrorIcon} alt="" aria-hidden="true" />
            <p>{errors.answerError}</p>
          </div>
        )}
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
        {errors.categoryError && (
          <div className="error-message">
            <img src={ErrorIcon} alt="" aria-hidden="true" />
            <p>{errors.categoryError}</p>
          </div>
        )}
      </div>
      {errors.formError && (
        <div className="error-message">
          <img src={ErrorIcon} alt="" aria-hidden="true" />
          <p>{errors.formError}</p>
        </div>
      )}
      <button type="submit" className="btn btn--primary">
        {buttonText}
      </button>
    </form>
  );
}
