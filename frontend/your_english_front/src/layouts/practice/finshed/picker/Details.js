import React from "react";
import styles from "./picker.module.css";
import DetailsScore from "./DetailsScore";
export default function Details({ wordbase }) {
  console.log("wordbase", wordbase);
  return (
    <div className={styles.details}>
      {wordbase === undefined ? (
        <div className={styles.selectLabel}>
          Select a wordbase to see details
        </div>
      ) : (
        <div>
          <div className={styles.label}>{wordbase.name}</div>
          <DetailsScore score={wordbase.score} maxScore={wordbase.maxScore} />
        </div>
      )}
    </div>
  );
}
