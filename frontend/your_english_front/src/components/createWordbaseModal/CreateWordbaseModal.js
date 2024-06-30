import React, { useState } from "react";
import Modal from "../moadal/Modal";
import styles from "./modal.module.css";
import { createWordbase } from "../../http/userData";
import MenuBtn from "../menuBtn/MenuBtn";

export default function CreateWordbaseModal({ hideModal }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const onTextChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const onCreateClick = () => {
    if (name === "") {
      setError("name can't be empty");
      return;
    }
    handleCreate().then((response) => {
      if (response.error) {
        setError(response.message);
        return;
      }
      window.location.href = "/wordbase/" + name;
    });
  };
  const handleCreate = async () => {
    return createWordbase(name);
  };
  return (
    <Modal height="35vh" width="50vh" style={{ borderRadius: "4rem" }}>
      <div className={styles.text}>enter wordbase name</div>
      <div className={styles.error}>{error}</div>
      <div
        style={{
          display: "flex",
          marginTop: "1vh",
          justifyContent: "center",
        }}
      >
        <input type="text" className={styles.input} onChange={onTextChange} />
        <div
          onClick={onCreateClick}
          style={{ fontSize: "3rem", marginLeft: "2rem" }}
        >
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <MenuBtn
        text="cancel"
        fontSize="1rem"
        width="20vh"
        height="5vh"
        containerStyle={{
          backgroundColor: "#333333",
          color: "white",
          textAlign: "center",
        }}
        onClick={hideModal}
      />
    </Modal>
  );
}
