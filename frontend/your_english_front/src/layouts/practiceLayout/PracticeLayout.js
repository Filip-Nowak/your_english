import React, { useState } from "react";
import Title from "../../components/title/Title";
import SelectedWordbases from "./SelectedWordbases";
import ModeSelector from "./ModeSelector";

export default function PracticeLayout() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedWordbases, setSelectedWordbases] = useState([]);

  const modes = [
    { name: "flashcards", icon: <i class="fa-solid fa-clone"></i> },
    { name: "fultiple Choice", icon: <i class="fa-solid fa-list"></i> },
    {
      name: "fill in the Blank",
      icon: <i class="fa-solid fa-pen-to-square"></i>,
    },
    { name: "connect", icon: <i class="fa-solid fa-link"></i> },
    { name: "random", icon: <i class="fa-solid fa-random"></i> },
  ];
  const handleStart = () => {
    const arr = modes[selectedMode].name.split(" ");
    const mode = arr.join("-").toLowerCase();
    let params = "";
    selectedWordbases.forEach((wordbase) => {
      params += `w=${wordbase}&`;
    });
    params = params.slice(0, -1);
    window.location.href = `/practice/${mode}?${params}`;
  };
  return (
    <div style={{ width: "100%" }}>
      <Title>practice</Title>
      <SelectedWordbases
        modeSelected={selectedMode !== null}
        setSelectedWordbases={setSelectedWordbases}
        selectedWordbases={selectedWordbases}
        handleStart={handleStart}
      />
      <ModeSelector
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        modes={modes}
      />
    </div>
  );
}
