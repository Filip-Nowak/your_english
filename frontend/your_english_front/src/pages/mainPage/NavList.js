import React, { useState } from "react";
import styles from "./mainPage.module.css";
import WordbaseList from "./WordbaseList";

export default function NavList({ arr, name, expanded, setExpanded }) {
  return (
    <div style={{ height: "40vh" }}>
      <div style={expanded ? { backgroundColor: "#333333" } : {}}>
        <div
          onClick={() => {
            window.location.pathname = "/wordbases";
          }}
          style={
            window.location.pathname === "/wordbases" ? {} : { color: "white" }
          }
          className={
            styles.navListButton +
            " " +
            (window.location.pathname === "/wordbases"
              ? styles.selectedBtn
              : "")
          }
        >
          <div style={{ display: "flex", width: "80%" }}>
            <div style={{ marginLeft: "1rem" }}>
              <i className="fa-solid fa-list"></i>
            </div>
            <div style={{ marginLeft: "1rem" }}>wordbases</div>
          </div>
          <div
            style={{
              textAlign: "center",
              width: "20%",
            }}
          >
            <i
              onClick={(e) => {
                setExpanded(!expanded);
                e.stopPropagation();
              }}
              style={{
                textAlign: "center",
              }}
              className={
                expanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
              }
            ></i>
          </div>
        </div>
        {expanded && <WordbaseList wordbases={arr} />}
      </div>
    </div>
  );
}
