import React from "react";
import styles from "./choice.module.css";
export default function QuestWord({ children, number, max }) {
  return (
    <div>
      <div className={styles.quest}>{children}</div>
      <div className={styles.questNumber}>
        {number}/{max}
      </div>
    </div>
  );
}
