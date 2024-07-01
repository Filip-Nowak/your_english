import React, { useContext, useState } from "react";
import styles from "./layout.module.css";
import LoadingContext from "../../context/LoadingContext";
import { updateRelation } from "../../http/userData";
export default function SelectedRelation({
  number,
  baseWord = "",
  baseMeaning = "",
  editing = false,
  setEditing,
  setSelectedRelation,
  handleUpdate,
}) {
  const [meaning, setMeaning] = useState(baseMeaning);
  const [word, setWord] = useState(baseWord);
  const onMeaningChange = (e) => {
    if (meaning === baseMeaning && word === baseWord) setEditing(false);
    else setEditing(true);
    setMeaning((prevState) => {
      prevState = e.target.value;
      if (prevState === baseMeaning && word === baseWord) setEditing(false);
      else setEditing(true);
      return prevState;
    });
  };
  const onWordChange = (e) => {
    setWord((prevState) => {
      prevState = e.target.value;
      if (meaning === baseMeaning && prevState === baseWord) setEditing(false);
      else setEditing(true);
      return prevState;
    });
  };

  return (
    <div
      onClick={(e) => {
        console.log("chuj");
        e.stopPropagation();
      }}
      className={styles.relation}
      style={{ backgroundColor: "#222222" }}
    >
      <div className={styles.number}>{number}</div>
      <input
        className={styles.input + " " + styles.meaning}
        onChange={onWordChange}
        value={word}
        type="text"
      />
      <input
        className={styles.input + " " + styles.meaning}
        onChange={onMeaningChange}
        value={meaning}
        type="text"
      />
      {editing && (
        <div
          style={{
            display: "flex",
            fontSize: "2rem",
            justifyContent: "right",
            width: "15%",
          }}
        >
          <div
            style={{ color: "green", marginRight: "1rem" }}
            onClick={() => {
              handleUpdate(word, meaning, number);
            }}
          >
            <i class="fa-solid fa-check"></i>
          </div>
          <div
            style={{ color: "red" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log(setSelectedRelation);
              setEditing(false);
              setSelectedRelation(null);
            }}
          >
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}
