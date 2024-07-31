import React, { useEffect, useState } from "react";
import QuestWord from "../choice/QuestWord";
import { useLoaderData } from "react-router-dom";
import InsertBox from "./InsertBox";
import FinishButton from "../finshed/FinishButton";

export default function InsertLayout({
  word,
  handleNext,
  numberInfo,
  addPoints,
  finishButton,
}) {
  const [correct, setCorrect] = useState(null);
  const [answer, setAnswer] = useState("");
  const handleSubmit = (answer) => {
    const c = checkCorrectness(answer);
    setCorrect(c);
    console.log(word);
    if (c) {
      console.log(word);
      addPoints(1, word.wordBaseName);
    } else {
      addPoints(0, word.wordBaseName);
    }
  };
  useEffect(() => {
    if (correct === null) {
      document.body.style.backgroundColor = "white";
    } else if (correct) {
      document.body.style.backgroundColor = "lightgreen";
    } else {
      document.body.style.backgroundColor = "lightcoral";
    }
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [correct]);

  const checkCorrectness = (userAnswer) => {
    userAnswer = userAnswer.trim();
    userAnswer = userAnswer.toLowerCase();
    return userAnswer === word.meaning.toLowerCase();
  };

  return (
    <div style={{ width: "100%" }}>
      <QuestWord numberInfo={numberInfo}>{word.word}</QuestWord>
      <div
        style={{
          height: "3rem",
          fontSize: "2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          color: correct ? "green" : "red",
        }}
      >
        {correct === null ? null : correct ? "correct" : "incorrect"}
        {correct === false ? (
          <div style={{ fontSize: "1.5rem", color: "black" }}>
            correct answer: {word.meaning}
          </div>
        ) : null}
      </div>
      <InsertBox
        handleSubmit={handleSubmit}
        correct={correct}
        handleNext={(xd) => {
          setCorrect(null);
          handleNext(xd);
        }}
      />
      {finishButton}
    </div>
  );
}
