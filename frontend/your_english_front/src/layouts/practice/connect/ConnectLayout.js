import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Title from "../../../components/title/Title";
import ConnectBox from "./ConnectBox";
import styles from "./connect.module.css";

export default function ConnectLayout() {
  const { response } = useLoaderData();
  const quests = response.data;
  const [index, setIndex] = useState(0);
  const [leftWords, setLeftWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [finished, setFinished] = useState(0);
  useEffect(() => {
    if (index !== quests.length) {
      const r = Math.random();
      const words = quests[index].map((q) => q.word);
      const meanings = quests[index].map((q) => q.meaning);
      if (r < 0.5) {
        setLeftWords(generateItems(words));
        setRightWords(generateItems(meanings));
      } else {
        setLeftWords(generateItems(meanings));
        setRightWords(generateItems(words));
      }
    }
  }, [index]);
  useEffect(() => {
    if (leftSelected !== null && rightSelected !== null) {
      const left = leftWords[leftSelected];
      const right = rightWords[rightSelected];
      if (left.id === right.id) {
        console.log("correct");
        left.checked = true;
        right.checked = true;
        setLeftWords([...leftWords]);
        setRightWords([...rightWords]);
        setLeftSelected(null);
        setRightSelected(null);
        setFinished((prevState) => prevState + 1);
      } else {
        console.log("wrong");
        setLeftSelected(null);
        setRightSelected(null);
      }
    }
  }, [leftSelected, rightSelected]);
  const handleLeftSelect = (index) => {
    setLeftSelected(index);
  };
  const handleRightSelect = (index) => {
    setRightSelected(index);
  };

  const generateItem = (name, id) => {
    return {
      id: id,
      word: name,
      checked: false,
    };
  };
  const generateItems = (names) => {
    return names.map((name, index) => generateItem(name, index));
  };
  const handleNext = () => {
    if (finished === quests[index].length) {
      setIndex((prevState) => prevState + 1);
      setFinished(0);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Title style={{ opacity: "0.8" }}>Connect words</Title>

      {index === quests.length ? (
        <div>Finished</div>
      ) : (
        <div>
          <ConnectBox
            leftWords={leftWords}
            rightWords={rightWords}
            leftSelected={leftSelected}
            rightSelected={rightSelected}
            handleLeftSelect={handleLeftSelect}
            handleRightSelect={handleRightSelect}
          />
          <div
            onClick={handleNext}
            className={
              styles.nextBtn +
              " " +
              (finished !== quests[index].length ? styles.nextDisabled : "")
            }
          >
            next
          </div>
        </div>
      )}
    </div>
  );
}
