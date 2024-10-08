import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Title from "../../../components/title/Title";
import Card from "./Card";
import CardInfo from "./CardInfo";
import { loadFlashCards } from "../../../http/practice";

export default function FlashcardsLayout() {
  const { response } = useLoaderData();
  const data = response.data;
  const [words, setWords] = useState(data.words);
  const [number, setNumber] = useState(1);
  const [index, setIndex] = useState(0);

  const handleNext = async () => {
    if (index + 1 === words.length) {
      if (number === data.max) return;
      console.log(number);
      const page = number / 20;
      console.log(page);
      const xd = await loadFlashCards(data.wordbases, page);
      console.log(xd);
      console.log(xd.data);
      const newWords = xd.data.words;
      console.log(newWords);
      setWords((prevState) => {
        return [...prevState, ...newWords];
      });
    }
    setIndex(index + 1);
    setNumber(number + 1);
  };
  const handlePrev = async () => {
    if (index === 0) return;
    setIndex(index - 1);
    setNumber(number - 1);
  };
  return (
    <div style={{ width: "100%" }}>
      <Title style={{ color: "#00000099", fontSize: "5rem" }}>Flashcards</Title>
      <Card word={words[index].word} meaning={words[index].meaning} />
      <CardInfo
        number={number}
        handleNext={handleNext}
        handlePrev={handlePrev}
        max={data.max}
      />
    </div>
  );
}
