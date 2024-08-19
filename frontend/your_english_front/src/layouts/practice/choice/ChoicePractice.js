import React, { useEffect, useState } from "react";
import MultipleChoiceLayout from "./MultipleChoiceLayout";
import { useLoaderData } from "react-router-dom";
import FinishedLayout from "../finshed/FinishedLayout";
import FinishButton from "../finshed/FinishButton";

export default function ChoicePractice() {
  const { response } = useLoaderData();
  const [index, setIndex] = useState(0);
  const [wordbases, setWordbases] = useState([]);
  const handleNext = () => {
    setIndex((prevState) => prevState + 1);
  };

  const addPoint = (points) => {
    setWordbases((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].name === response.data[index].wordBaseName) {
          prevState[i].score += points;
          prevState[i].maxScore += 1;
          return [...prevState];
        }
      }
      prevState.push({
        name: response.data[index].wordBaseName,
        maxScore: 1,
        score: points,
      });
      return [...prevState];
    });
  };

  return index === response.data.length ? (
    <FinishedLayout wordbases={wordbases} time={55} type={"choice"} />
  ) : (
    <MultipleChoiceLayout
      numberInfo={`${index + 1}/${response.data.length}`}
      quest={response.data[index]}
      handleNext={handleNext}
      addPoints={addPoint}
      finishButton={
        <FinishButton
          handleClick={() => setIndex(response.data.length)}
          disabled={index === 0 || index === response.data.length - 1}
        />
      }
    />
  );
}
