import React, { useState } from "react";
import Title from "../../components/title/Title";
import SelectedWordbases from "./SelectedWordbases";
import ModeSelector from "./ModeSelector";

export default function PracticeLayout() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedWordbases, setSelectedWordbases] = useState([]);
  const modes = [
    {
      name: "flashcards",
      icon: <i class="fa-solid fa-clone"></i>,
      urlName: "flashcards",
    },
    {
      name: "multiple Choice",
      icon: <i class="fa-solid fa-list"></i>,
      urlName: "choice",
    },
    {
      name: "insert answer",
      icon: <i class="fa-solid fa-pen-to-square"></i>,
      urlName: "insert",
    },
    {
      name: "connect",
      icon: <i class="fa-solid fa-link"></i>,
      urlName: "connect",
    },
    {
      name: "random",
      icon: <i class="fa-solid fa-random"></i>,
      urlName: "random",
    },
  ];
  const handleStart = () => {
    let params = "";
    selectedWordbases.forEach((wordbase) => {
      params += `w=${wordbase}&`;
    });
    params = params.slice(0, -1);
    window.location.href = `/practice/${modes[selectedMode].urlName}?${params}`;
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
