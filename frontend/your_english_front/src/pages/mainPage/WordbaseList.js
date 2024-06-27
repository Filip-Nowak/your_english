import React from "react";
import styles from "./mainPage.module.css";
export default function WordbaseList({ wordbases }) {
  return (
    <div className={styles.wordbaseList}>
      {wordbases.length === 0 ? (
        <div className={styles.noWordbases}>No wordbases found</div>
      ) : (
        wordbases.map((wordbase, i) => (
          <div
            key={wordbase}
            className={styles.wordbase}
            style={i === 0 ? { border: "none" } : {}}
          >
            {wordbase}
          </div>
        ))
      )}
    </div>
  );
}
