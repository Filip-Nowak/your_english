import React, { useState } from "react";
import MenuBtn from "../../components/menuBtn/MenuBtn";
import styles from "./practice.module.css";
import WordbaseElement from "./WordbaseElement";
import WordbaseModal from "./WordbaseModal";
import { useLoaderData } from "react-router-dom";
export default function SelectedWordbases({ modeSelected }) {
  const [adding, setAdding] = useState(false);
  const data = useLoaderData();
  const wordbases = data.wordbasesResponse.data;
  const [selectedWordbases, setSelectedWordbases] = useState([]);
  const handleAdd = () => {
    setAdding(true);
  };
  const handleCancel = () => {
    setAdding(false);
  };
  const addWordbase = (wordbase) => {
    setSelectedWordbases([...selectedWordbases, wordbase]);
    setAdding(false);
  };
  const handleDelete = (wordbase) => {
    setSelectedWordbases(
      selectedWordbases.filter(
        (selectedWordbase) => selectedWordbase !== wordbase
      )
    );
  };
  return (
    <div>
      <div className={styles.container}>
        <div style={{ fontSize: "2rem", textAlign: "center", color: "#555" }}>
          select wordbases to practise
        </div>
        <div className={styles.wordbasesContainer}>
          {selectedWordbases.length === 0 ? (
            <div>no wordbases selected</div>
          ) : (
            selectedWordbases.map((wordbase) => (
              <WordbaseElement
                key={wordbase.id}
                name={wordbase}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
        <div style={{ display: "flex" }}>
          <MenuBtn
            containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
            icon={
              <i style={{ fontSize: "2rem" }} className="fa-solid fa-plus"></i>
            }
            text="add wordbase"
            width="12vw"
            height="7vh"
            textStyle={{ fontSize: "1.5rem" }}
            onClick={handleAdd}
          />
          <MenuBtn
            text={"start"}
            width={"12vw"}
            height={"7vh"}
            containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
            textStyle={{ fontSize: "1.5rem" }}
            icon={
              <i style={{ fontSize: "2rem" }} className="fa-solid fa-play"></i>
            }
            disabled={!(selectedWordbases.length > 0 && modeSelected)}
          />
        </div>
      </div>

      {adding ? (
        <WordbaseModal
          handleCancel={handleCancel}
          wordbases={wordbases.filter(
            (wordbase) => !selectedWordbases.includes(wordbase)
          )}
          addWordbase={addWordbase}
        />
      ) : null}
    </div>
  );
}
