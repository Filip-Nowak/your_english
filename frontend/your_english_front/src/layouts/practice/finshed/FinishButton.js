import React from "react";
import styles from "./finished.module.css";
export default function FinishButton({ handleClick, disabled }) {
  return (
    <div
      className={
        styles.finishButton + " " + (disabled ? styles.disabledBtn : "")
      }
      onClick={() => {
        if (!disabled) handleClick();
      }}
    >
      finish
    </div>
  );
}
