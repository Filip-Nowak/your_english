import React, { useEffect } from "react";
import Title from "../../../components/title/Title";
import styles from "./finished.module.css";
import WordbasePicker from "./picker/WordbasePicker";
import ScoreInfo from "./ScoreInfo";
import MenuBtn from "../../../components/menuBtn/MenuBtn";
export default function FinishedLayout({ type, time, wordbases }) {
  console.log(wordbases);
  let maxScore = 0;
  wordbases.forEach((wordbase) => {
    maxScore += wordbase.maxScore;
  });
  let score = 0;
  wordbases.forEach((wordbase) => {
    score += wordbase.score;
  });
  const handleRetry = () => {
    document.location.reload();
  };
  const handleHome = () => {
    document.location.href = "/";
  };
  const handleEdit = () => {
    document.location.href = "/practice" + window.location.search;
  };
  return (
    <div style={{ width: "100%" }}>
      <Title>Finished</Title>
      <div className={styles.type}>mode: {type}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "10vh",
        }}
      >
        <ScoreInfo score={score} time={time} maxScore={maxScore} />
        <WordbasePicker wordbases={wordbases} />
      </div>
      <div className={styles.buttonContainer}>
        <MenuBtn
          containerStyle={{ width: "25%", height: "auto", margin: 0 }}
          onClick={handleRetry}
          text={"retry"}
          icon={<i className={"fas fa-redo-alt " + styles.icon}></i>}
        />
        <MenuBtn
          containerStyle={{ width: "25%", height: "auto", margin: 0 }}
          onClick={handleEdit}
          text={"edit"}
          icon={<i className="fa-solid fa-pen-to-square"></i>}
        />
        <MenuBtn
          onClick={handleHome}
          containerStyle={{ width: "25%", height: "auto", margin: 0 }}
          text={"home"}
          icon={<i className={"fa fa-home " + styles.icon}></i>}
        />
      </div>
    </div>
  );
}
