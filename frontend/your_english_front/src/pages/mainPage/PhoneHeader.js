import React from "react";
import styles from "./mainPage.module.css";
import Logo from "./Logo";
export default function PhoneHeader({ showSidebar }) {
  return (
    <div className={styles.header}>
      <div className={styles.openBtn}>
        <i
          onClick={() => {
            showSidebar(true);
          }}
          className="fas fa-bars"
          style={{
            fontSize: "3rem",
            color: "white",
            padding: "0.5rem",
          }}
        ></i>
      </div>
      <Logo />
    </div>
  );
}
