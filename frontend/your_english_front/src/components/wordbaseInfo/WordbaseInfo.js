import React from "react";
import styles from "./wordbaseInfo.module.css";
import { deleteWordbase } from "../../http/userData";
export default function WordbaseInfo({ name, count }) {
  const handleDelete = () => {
    // deleteWordbase(name).then(() => {
    //   window.location.reload();
    // });
    console.log("delete clicked");
  };
  const onClick = () => {
    // window.location.href = `/wordbase/${name}`;
    console.log("clicked");
  };
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.name}>{name}</div>
      <div className={styles.count}>words: {count}</div>

      <div className={styles.delete} onClick={handleDelete}>
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
