import React from "react";
import Title from "../../../components/title/Title";
import styles from "./finished.module.css";
import FinishInfo from "./FinishInfo";
export default function FinishedLayout({ results, type }) {
  return (
    <div>
      <Title>Finished</Title>
      <div className={styles.type}>mode: {type}</div>
      <FinishInfo score={results.score} time={results.time} />
    </div>
  );
}
