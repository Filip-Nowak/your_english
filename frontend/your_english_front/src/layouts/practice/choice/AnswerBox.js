import React, { useState } from "react";
import styles from "./choice.module.css";
import CheckButton from "./CheckButton";
import NextButton from "./NextButton";
export default function AnswerBox({
  answers,
  handleSubmit,
  correct = null,
  handleNext,
}) {
  const [selected, setSelected] = useState(null);
  const handleAnswerClick = (index) => {
    if (correct !== null) return;
    setSelected(index);
  };
  console.log(selected);
  return (
    <div className={styles.answerBox}>
      <div className={styles.question}>what does it mean?</div>
      <div className={styles.answersContainer}>
        {answers.map((answer, index) => (
          <div
            key={index}
            className={
              styles.answer +
              " " +
              (correct === null
                ? selected === index
                  ? styles.selected
                  : ""
                : index === correct
                ? styles.correct
                : index === selected
                ? styles.wrong
                : "")
            }
            onClick={() => handleAnswerClick(index)}
          >
            {answer}
          </div>
        ))}
      </div>
      {correct === null ? (
        <CheckButton
          disabled={!(selected !== null)}
          onClick={() => {
            handleSubmit(selected);
          }}
        />
      ) : (
        <NextButton
          onClick={() => {
            setSelected(null);
            handleNext();
          }}
        />
      )}
    </div>
  );
}
