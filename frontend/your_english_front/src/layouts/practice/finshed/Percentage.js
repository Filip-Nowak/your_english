import React from "react";
import styles from "./finished.module.css";

export default function Percentage({ percentage, color }) {
  return (
    <div className={styles.scorePercentage}>
      <div>score: </div>
      <div
        className={styles.percentage}
        style={{
          color: color,
          fontSize: !Number.isInteger(percentage) ? "5rem" : "",
        }}
      >
        {percentage} %
      </div>
    </div>
  );
}
