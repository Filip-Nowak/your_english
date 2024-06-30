import React, { useState } from "react";
import Title from "../../components/title/Title";
import HomeBtn from "../../components/menuBtn/MenuBtn";
import styles from "./homeLayout.module.css";
import CreateWordbaseModal from "../../components/createWordbaseModal/CreateWordbaseModal";
export default function HomeLayout() {
  const [modal, setModal] = useState(false);
  const onPracticeClick = () => {
    window.location.href = "/practice";
  };
  const onWordbasesClick = () => {
    window.location.href = "/wordbases";
  };
  const onCreateWordbaseClick = () => {
    setModal(true);
  };
  const onSettingsClick = () => {
    window.location.href = "/settings";
  };

  return (
    <div style={{ width: "100%" }}>
      <Title>home</Title>
      <div className={styles.buttonsContainer}>
        <HomeBtn
          onClick={onPracticeClick}
          text="practice"
          icon={<i class="fa-solid fa-pen-to-square"></i>}
        />
        <HomeBtn
          onClick={onWordbasesClick}
          text="your wordbases"
          icon={<i class="fa-solid fa-list"></i>}
        />
        <HomeBtn
          onClick={onCreateWordbaseClick}
          text="create wordbase"
          icon={<i class="fa-solid fa-plus"></i>}
        />
        <HomeBtn
          onClick={onSettingsClick}
          text="settings"
          icon={<i class="fa-solid fa-gear"></i>}
        />
      </div>
      {modal ? <CreateWordbaseModal hideModal={() => setModal(false)} /> : ""}
    </div>
  );
}
