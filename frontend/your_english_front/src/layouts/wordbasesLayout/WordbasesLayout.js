import React, { useState } from "react";
import Title from "../../components/title/Title";
import styles from "./wordbasesLayout.module.css";
import { useLoaderData } from "react-router-dom";
import WorrdbaseInfo from "../../components/wordbaseInfo/WordbaseInfo";
import MenuBtn from "../../components/menuBtn/MenuBtn";
import Modal from "../../components/moadal/Modal";
import Input from "../../components/input/Input";
import CreateWordbaseModal from "../../components/createWordbaseModal/CreateWordbaseModal";
export default function WordbasesLayout() {
  const { wordbasesResponse } = useLoaderData();
  const wordbases = wordbasesResponse.data;
  const onCreateWordbaseClick = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <Title>wordbases</Title>
      <div className={styles.wordbasesContainer}>
        {wordbases.length === 0 ? (
          <div className={styles.empty}>your wordbases will be here</div>
        ) : (
          wordbases.map((wordbase) => (
            <WorrdbaseInfo
              key={wordbase.name}
              name={wordbase.name}
              count={wordbase.wordCount}
            />
          ))
        )}
      </div>
      <MenuBtn
        onClick={onCreateWordbaseClick}
        text="create wordbase"
        icon={<i class="fa-solid fa-plus"></i>}
        height="6vh"
        width="30vh"
        fontSize="2rem"
        containerStyle={{
          marginTop: "4vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      {showModal ? <CreateWordbaseModal hideModal={hideModal} /> : ""}
    </div>
  );
}
