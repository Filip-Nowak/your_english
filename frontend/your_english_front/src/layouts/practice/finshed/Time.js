import React from "react";
import styles from "./finished.module.css";
export default function Time({ time }) {
  let timeStr = "";
  timeStr = Math.floor(time / 60) + " : ";

  let seconds = time % 60;
  if (seconds < 10) {
    timeStr += "0" + seconds;
  } else {
    timeStr += seconds;
  }
  return (
    <div className={styles.timeContainer}>
      <div className={styles.timeLabel}>time:</div>
      <div className={styles.time}>{timeStr}</div>
    </div>
  );
}
