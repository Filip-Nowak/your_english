import React from "react";
import styles from "./choice.module.css";
export default function NextButton({ onClick }) {
  return (
    <div className={styles.checkBtn + " " + styles.nextBtn} onClick={onClick}>
      <div>next</div>
      <i className="fas fa-arrow-right"></i>
    </div>
  );
}
