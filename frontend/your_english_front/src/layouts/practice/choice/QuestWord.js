import React from "react";
import styles from "./choice.module.css";
export default function QuestWord({ children, numberInfo }) {
  return (
    <div>
      <div className={styles.quest}>{children}</div>
      <div className={styles.questNumber}>{numberInfo}</div>
    </div>
  );
}
