import React from "react";
import styles from "./flashcards.module.css";
export default function CardInfo({ number, handleNext, handlePrev, max }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "20vw",
        margin: "auto",
        marginTop: "10vh",
        height: "10vh",
        alignItems: "center",
      }}
    >
      {number !== 1 ? (
        <i
          className={styles.arrow + " fas fa-arrow-left"}
          onClick={handlePrev}
        ></i>
      ) : (
        <div style={{ width: "5vw" }}></div>
      )}
      <h1>
        {number} / {max}
      </h1>
      {number !== max ? (
        <i
          onClick={handleNext}
          className={styles.arrow + " fas fa-arrow-right"}
        ></i>
      ) : (
        <div style={{ width: "5vw" }}></div>
      )}
    </div>
  );
}
