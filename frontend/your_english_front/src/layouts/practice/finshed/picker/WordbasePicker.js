import React, { useState } from "react";
import styles from "./picker.module.css";
import finishStyles from "../finished.module.css";
import Details from "./Details";
import List from "./List";
export default function WordbasePicker({ wordbases }) {
  const [selected, setSelected] = useState(null);
  const handleSelect = (index) => {
    setSelected(index);
  };
  return (
    <div className={styles.pickerContainer}>
      <div className={finishStyles.header}>details</div>
      <div className={styles.picker}>
        <Details wordbase={wordbases[selected]} />
        <List
          wordbases={wordbases}
          handleSelect={handleSelect}
          selected={selected}
        />
      </div>
    </div>
  );
}
