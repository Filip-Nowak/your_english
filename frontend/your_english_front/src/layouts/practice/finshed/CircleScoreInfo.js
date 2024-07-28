import React from "react";
import styles from "./finished.module.css";
export default function CircleScoreInfo({ score }) {
  return (
    <div className={styles.circleScoreInfo}>
      <div className={styles.circleScore}>{score}</div>
      <div className={styles.circleScoreLabel}>Score</div>
    </div>
  );
}
