import React, { useRef, useState } from "react";
import styles from "./insert.module.css";
export default function FlexibleInput({
  content,
  setContent,
  disabled,
  correct,
}) {
  const handleChange = (e) => {
    if (disabled) return;
    setContent(e.target.value);
  };
  console.log("correct", correct);
  return (
    <textarea
      className={styles.input}
      type="text"
      value={content}
      onChange={handleChange}
      style={{
        backgroundColor:
          correct === null ? "white" : correct ? "lightgreen" : "lightcoral",
      }}
    />
  );
}
