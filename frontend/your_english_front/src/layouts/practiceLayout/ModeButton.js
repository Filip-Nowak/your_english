import React from "react";
import styles from "./practice.module.css";
export default function ModeButton({ name, icon, onClick, selected }) {
  return (
    <div
      className={styles.mode}
      onClick={onClick}
      style={selected ? { borderColor: "lime" } : {}}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          width: "100%",
          fontSize: "2rem",
        }}
      >
        {selected ? (
          <i style={{ color: "lime" }} class="fa-solid fa-circle-check"></i>
        ) : (
          <i class="fa-regular fa-circle"></i>
        )}
      </div>
      <div
        className={styles.modeIcon}
        style={{
          color: selected ? "green" : "black",
        }}
      >
        {icon}
      </div>
      <div className={styles.modeName}>{name}</div>
    </div>
  );
}
