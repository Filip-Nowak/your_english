import React, { useEffect, useState } from "react";
import Title from "../../../components/title/Title";
import { useLoaderData } from "react-router-dom";
import QuestWord from "./QuestWord";
import AnswerBox from "./AnswerBox";

export default function MultipleChoiceLayout() {
  const { response } = useLoaderData();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(response.data[0].meanings);
  const [correct, setCorrect] = useState();
  const [answered, setAnswered] = useState(false);
  const [points, setPoints] = useState(0);
  useEffect(() => {
    if (index === response.data.length) return;
    setAnswers((prevState) => {
      prevState = response.data[index].meanings;
      let correctAnswer = prevState.shift();
      let randomIndex = Math.floor(Math.random() * 4);
      prevState.splice(randomIndex, 0, correctAnswer);
      setCorrect(randomIndex);
      return [...prevState];
    });
  }, [index]);
  const handleSubmit = (index) => {
    setAnswered(true);
    if (index === correct) {
      setPoints((prevState) => prevState + 1);
    }
  };
  const handleNext = () => {
    setIndex((prevState) => prevState + 1);
    setAnswered(false);
  };
  const handleRetry = () => {
    document.location.reload();
  };
  const handleReturn = () => {
    document.location.href = "/";
  };
  return (
    <div style={{ width: "100%" }}>
      {index === response.data.length ? (
        <div>finished</div>
      ) : (
        <div>
          <QuestWord number={index + 1} max={response.data.length}>
            {response.data[index].word}
          </QuestWord>
          <AnswerBox
            handleSubmit={handleSubmit}
            answers={answers}
            correct={answered ? correct : null}
            handleNext={handleNext}
          />
        </div>
      )}
    </div>
  );
}
