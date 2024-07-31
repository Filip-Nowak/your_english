import React, { useEffect, useState } from "react";
import Title from "../../../components/title/Title";
import { useLoaderData } from "react-router-dom";
import QuestWord from "./QuestWord";
import AnswerBox from "./AnswerBox";

export default function MultipleChoiceLayout({
  numberInfo,
  quest,
  handleNext,
  addPoints,
  finishButton,
}) {
  console.log(quest);
  const { word, meanings } = quest;
  const [answers, setAnswers] = useState(meanings);
  const [correct, setCorrect] = useState();
  useEffect(() => {
    setAnswers((prevState) => {
      prevState = meanings;
      let correctAnswer = prevState.shift();
      let randomIndex = Math.floor(Math.random() * 4);
      prevState.splice(randomIndex, 0, correctAnswer);
      setCorrect(randomIndex);
      return [...prevState];
    });
  }, [quest]);
  const [answered, setAnswered] = useState(false);
  const handleSubmit = (index) => {
    setAnswered(true);
    console.log(word);
    console.log(quest);
    if (index === correct) {
      addPoints(1, quest.wordBaseName);
    } else {
      addPoints(0, quest.wordBaseName);
    }
  };
  const handleNextClick = () => {
    setAnswered(false);
    handleNext();
  };
  return (
    <div style={{ width: "100%" }}>
      <div>
        <QuestWord numberInfo={numberInfo}>{word}</QuestWord>
        <AnswerBox
          handleSubmit={handleSubmit}
          answers={answers}
          correct={answered ? correct : null}
          handleNext={handleNextClick}
        />
      </div>
      {finishButton}
    </div>
  );
}
