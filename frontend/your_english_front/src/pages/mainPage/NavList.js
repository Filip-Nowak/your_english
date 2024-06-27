import React, { useState } from "react";
import styles from "./mainPage.module.css";
import WordbaseList from "./WordbaseList";

export default function NavList({ arr, name, expanded, setExpanded }) {
  return (
    <div style={expanded ? { backgroundColor: "#333333" } : {}}>
      <div
        className={
          styles.navBtn +
          " " +
          (window.location.pathname === "/wordbases" ? styles.selectedBtn : "")
        }
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <div
          style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            height: "100%",
            width: "100%",
          }}
          onClick={() => {
            window.location.pathname = "/wordbases";
          }}
        >
          <div style={{ marginLeft: "1rem" }}>
            {<i className="fa-solid fa-list"></i>}
          </div>
          <div style={{ marginLeft: "1rem" }}>{name}</div>
        </div>
        <div
          onClick={() => {
            setExpanded((prevState) => !prevState);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "1rem",
            paddingLeft: "1rem",
          }}
        >
          {expanded ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </div>
      </div>
      {expanded ? <WordbaseList wordbases={arr} /> : ""}
    </div>
  );
}
