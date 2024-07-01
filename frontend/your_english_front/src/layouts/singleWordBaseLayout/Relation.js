import React from "react";
import styles from "./layout.module.css";
export default function Relation({ number, word, meaning, handleDelete }) {
  return (
    <div key={word} className={styles.relation}>
      <div className={styles.number}>{number}</div>
      <div className={styles.word}>{word}</div>
      <div className={styles.meaning}>{meaning}</div>
      <div
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(number);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
