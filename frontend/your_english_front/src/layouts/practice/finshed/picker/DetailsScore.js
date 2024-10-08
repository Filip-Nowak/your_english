import React from "react";
import styles from "./picker.module.css";
export default function DetailsScore({ score, maxScore }) {
  const percentage = Math.floor((score / maxScore) * 1000) / 10;
  return (
    <div className={styles.detailsScore}>
      <div style={{ width: "60%" }}>
        <div style={{ fontSize: "50%" }}>score:</div>
        <div className={styles.percentage}>{percentage}%</div>
      </div>
      <div className={styles.answersInfo}>
        <div>correct answers: {score}</div>
        <div>out of: {maxScore}</div>
      </div>
    </div>
  );
}
