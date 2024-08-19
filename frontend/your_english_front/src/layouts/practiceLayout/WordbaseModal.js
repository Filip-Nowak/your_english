import React from "react";
import Modal from "../../components/moadal/Modal";
import styles from "./practice.module.css";
import MenuBtn from "../../components/menuBtn/MenuBtn";
export default function WordbaseModal({
  wordbases,
  handleCancel,
  addWordbase,
}) {
  return (
    <Modal height={"60vh"} width={"25vw"} style={{ borderRadius: "2rem" }}>
      <div className={styles.modal}>
        <div style={{ fontSize: "2rem" }}>pick wordbase</div>
        <div className={styles.list}>
          {wordbases.map((wordbase) => (
            <div
              key={wordbase.id}
              className={styles.pick}
              onClick={() => {
                addWordbase(wordbase.name);
              }}
            >
              {wordbase.name}
            </div>
          ))}
        </div>
        <MenuBtn
          icon={
            <i style={{ fontSize: "2rem" }} className="fa-solid fa-xmark"></i>
          }
          text="cancel"
          width="10vw"
          height="7vh"
          containerStyle={{
            backgroundColor: "#555",
            color: "white",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          textStyle={{ fontSize: "1.5rem" }}
          onClick={handleCancel}
        />
      </div>
    </Modal>
  );
}
