import React from "react";
import styles from "./mainPage.module.css";
export default function NavButton({ name }) {
  return <div className={styles.navBtn}>{name}</div>;
}
