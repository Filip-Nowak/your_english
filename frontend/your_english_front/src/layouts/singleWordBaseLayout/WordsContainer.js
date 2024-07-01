import React, { useState } from "react";
import styles from "./layout.module.css";
import Relation from "./Relation";
import MenuBtn from "../../components/menuBtn/MenuBtn";
import SelectedRelation from "./SelectedRelation";
export default function WordsContainer({
  relations,
  selectedRelation,
  setSelectedRelation,
  editing,
  setEditing,
  handleUpdate,
  addRelation,
  handleDelete,
}) {
  const onAddClick = () => {
    console.log("xdd");
    setSelectedRelation(null);
    setEditing(true);
  };

  return (
    <div className={styles.wordsContainer}>
      <div className={styles.listHeader}>
        <div style={{ marginLeft: "20%", width: "25%" }}>word</div>
        <div style={{ marginLeft: "10%", width: "25%" }}>meaning</div>
      </div>
      <div style={{ display: "flex", height: "40vh" }}>
        <div style={{ width: "5vw" }}></div>
        <div>
          <div className={styles.list}>
            {relations.length === 0 && (
              <div
                style={{ color: "#333", fontSize: "2rem", marginTop: "2rem" }}
              >
                No words in this wordbase
              </div>
            )}
            {relations.map((relation, i) => {
              return selectedRelation === i ? (
                <SelectedRelation
                  key={i + 1}
                  baseMeaning={relation.meaning}
                  baseWord={relation.word}
                  number={i + 1}
                  editing={editing}
                  setEditing={setEditing}
                  setSelectedRelation={setSelectedRelation}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <div
                  key={i + 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRelation(i);
                  }}
                >
                  <Relation
                    {...relation}
                    number={i + 1}
                    handleDelete={handleDelete}
                  />
                </div>
              );
            })}
            {editing && selectedRelation === null && (
              <SelectedRelation
                key={relations.length + 1}
                number={relations.length + 1}
                editing={editing}
                setEditing={setEditing}
                setSelectedRelation={setSelectedRelation}
                handleUpdate={addRelation}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <MenuBtn
          disabled={editing}
          onClick={onAddClick}
          text="add word"
          icon={<i className="fa-solid fa-plus"></i>}
          height="6vh"
          width="20vh"
          containerStyle={{
            margin: "0",
            marginRight: "5%",
            marginTop: "2vh",
            backgroundColor: "#f5f5f5",
          }}
          fontSize="2rem"
        />
        {relations.length >= 5 ? (
          <MenuBtn
            text="pracise"
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            height="6vh"
            width="30vh"
            fontSize="2rem"
            containerStyle={{
              margin: "0",
              marginRight: "15%",
              marginTop: "2vh",
              backgroundColor: "#f5f5f5",
            }}
          />
        ) : (
          <div
            style={{
              width: "30vh",
              marginRight: "15%",
              textAlign: "center",
              marginTop: "2vh",
              fontSize: "1.5rem",
            }}
          >
            you need at lest 5 relations to practise
          </div>
        )}
      </div>
    </div>
  );
}
