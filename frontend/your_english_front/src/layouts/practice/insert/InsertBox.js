import React, { useState } from "react";
import styles from "./insert.module.css";
import FlexibleInput from "./FlexibleInput";
export default function InsertBox({ handleSubmit, correct, handleNext }) {
  const [answer, setAnswer] = useState("");
  return (
    <div className={styles.insertBox}>
      <FlexibleInput
        content={answer}
        setContent={setAnswer}
        disabled={correct !== null}
        correct={correct}
      />

      {correct === null ? (
        <div
          className={
            styles.submit + " " + (answer === "" ? styles.disabled : "")
          }
          onClick={(e) => {
            if (answer === "") return;
            handleSubmit(answer);
          }}
        >
          submit
        </div>
      ) : (
        <div
          className={styles.submit}
          onClick={(e) => {
            setAnswer("");
            handleNext();
          }}
        >
          next
        </div>
      )}
    </div>
  );
}
