import React from "react";
import styles from "./mainPage.module.css";
export default function NavButton({ name, icon, path }) {
  const selectedBtn = window.location.pathname === path;
  const handleClick = () => {
    window.location.pathname = path;
  };
  return (
    <div
      onClick={handleClick}
      className={styles.navBtn + " " + (selectedBtn ? styles.selectedBtn : "")}
    >
      <div style={{ marginLeft: "1rem", display: "flex" }}>
        <div>{icon}</div>
        <div style={{ marginLeft: "1rem" }}>{name}</div>
      </div>
    </div>
  );
}
