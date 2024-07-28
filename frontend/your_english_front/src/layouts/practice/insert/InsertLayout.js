import React, { useEffect, useState } from "react";
import QuestWord from "../choice/QuestWord";
import { useLoaderData } from "react-router-dom";
import InsertBox from "./InsertBox";

export default function InsertLayout() {
  const { response } = useLoaderData();
  const words = response.data;
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(null);
  const handleSubmit = (answer) => {
    setCorrect(checkCorrectness(answer));
  };
  useEffect(() => {
    if (index !== words.length) {
      setQuestion(words[index]);
    }
  }, [index]);
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

  const setQuestion = ({ word, meaning }) => {
    const r = Math.random();
    if (r < 0.5) {
      setQuest(word);
      setAnswer(meaning);
    } else {
      setQuest(meaning);
      setAnswer(word);
    }
  };

  const checkCorrectness = (userAnswer) => {
    userAnswer = userAnswer.trim();
    userAnswer = userAnswer.toLowerCase();
    return userAnswer === answer;
  };
  const handleNext = () => {
    setIndex(index + 1);
    setCorrect(null);
  };

  return (
    <div style={{ width: "100%" }}>
      <QuestWord number={index + 1} max={response.data.length}>
        {quest}
      </QuestWord>
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
            correct answer: {answer}
          </div>
        ) : null}
      </div>
      <InsertBox
        handleSubmit={handleSubmit}
        correct={correct}
        handleNext={handleNext}
      />
    </div>
  );
}
