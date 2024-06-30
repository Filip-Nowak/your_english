import React from "react";
import styles from "./modal.module.css";
export default function Modal({
  children,
  height,
  width,
  style = {},
  className = "",
}) {
  return (
    <div className={styles.background}>
      <div
        className={className + " " + styles.container}
        style={{ height: height, width: width, ...style }}
      >
        {children}
      </div>
    </div>
  );
}
