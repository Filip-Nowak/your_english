import React from "react";
import styles from "./menuBtn.module.css";
export default function MenuBtn({
  onClick,
  text,
  icon = null,
  height = "25vh",
  width = "32vh",
  fontSize = "3rem",
  containerStyle = {},
  textStyle = {},
}) {
  console.log(height);
  let wordCount = text.split(" ").length;
  let textsize = fontSize;
  if (wordCount === 1) {
    if (text.length > 5) {
      textsize = 30 / text.length;
    }
  }
  return (
    <div
      className={styles.container}
      onClick={onClick}
      style={{ height: height, width: width, ...containerStyle }}
    >
      {icon === null ? (
        ""
      ) : (
        <div
          style={{
            fontSize: fontSize,
            width: "30%",
            textAlign: "center",
          }}
        >
          {icon}
        </div>
      )}

      <div
        className={styles.text}
        style={{
          lineHeight: "3rem",
          width: icon === null ? "100%" : "70%",
          fontSize: fontSize,
          ...textStyle,
        }}
      >
        {text}
      </div>
    </div>
  );
}
