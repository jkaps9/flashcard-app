import { useState, useRef } from "react";
import ErrorIcon from "../assets/icons/icon-error.svg";
import PlusIcon from "../assets/icons/icon-circle-plus.svg";

export default function CardForm({
  initialState = { question: "", answer: "", category: "" },
  onSubmit,
  children,
  buttonText,
  isCreating = false,
}) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    questionError: "",
    answerError: "",
    categoryError: "",
    formError: "",
  });

  const inputQuestionRef = useRef(null);
  const inputAnswerRef = useRef(null);
  const inputCategoryRef = useRef(null);

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
    return { isValid, newErrors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validateForm();
    if (isValid) {
      onSubmit(formData);
      setFormData(initialState);
    } else {
      if (newErrors.questionError && inputQuestionRef.current) {
        inputQuestionRef.current.focus();
      } else if (newErrors.answerError && inputAnswerRef.current) {
        inputAnswerRef.current.focus();
      } else if (newErrors.categoryError && inputCategoryRef.current) {
        inputCategoryRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form" noValidate>
      {children}
      <div className="input-group">
        <label htmlFor="question">Question</label>
        <input
          ref={inputQuestionRef}
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="e.g., What is the capital of France?"
          autoFocus
          aria-describedby={"questionError"}
          aria-invalid={errors.questionError}
          required
        />
        {errors.questionError && (
          <div id="questionError" className="error-message">
            <img src={ErrorIcon} alt="" aria-hidden="true" />
            <p>{errors.questionError}</p>
          </div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="answer">Answer</label>
        <textarea
          ref={inputAnswerRef}
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="e.g., Paris"
          rows={3}
          aria-describedby={"answerError"}
          aria-invalid={errors.answerError}
          required
        />
        {errors.answerError && (
          <div id="answerError" className="error-message">
            <img src={ErrorIcon} alt="" aria-hidden="true" />
            <p>{errors.answerError}</p>
          </div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <input
          ref={inputCategoryRef}
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Geography"
          aria-describedby={"categoryError"}
          aria-invalid={errors.categoryError}
          required
        />
        {errors.categoryError && (
          <div id="categoryError" className="error-message">
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
        {isCreating && <img src={PlusIcon} alt="" aria-hidden="true" />}
        {buttonText}
      </button>
    </form>
  );
}
