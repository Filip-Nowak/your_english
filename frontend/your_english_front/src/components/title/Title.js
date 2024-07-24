import React from "react";
import styles from "./title.module.css";
export default function Title({ children, style = {} }) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}
