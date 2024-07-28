import React from "react";
import styles from "./connect.module.css";
export default function ConnectItem({ item, onClick, selected }) {
  return (
    <div
      className={
        styles.item +
        " " +
        (item.checked ? styles.checked : "") +
        " " +
        (selected ? styles.selected : "")
      }
      onClick={onClick}
    >
      {item.word}
    </div>
  );
}
