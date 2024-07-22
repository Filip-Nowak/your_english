import React, { useState } from "react";
import Title from "../../components/title/Title";
import SelectedWordbases from "./SelectedWordbases";
import ModeSelector from "./ModeSelector";

export default function PracticeLayout() {
  const [selectedMode, setSelectedMode] = useState(null);
  const modes = [
    { name: "Flashcards", icon: <i class="fa-solid fa-bullseye"></i> },
    { name: "Multiple Choice", icon: <i class="fa-solid fa-list"></i> },
    {
      name: "Fill in the Blank",
      icon: <i class="fa-solid fa-pen-to-square"></i>,
    },
    { name: "Connect", icon: <i class="fa-solid fa-link"></i> },
    { name: "random", icon: <i class="fa-solid fa-random"></i> },
  ];
  return (
    <div style={{ width: "100%" }}>
      <Title>practice</Title>
      <SelectedWordbases modeSelected={selectedMode !== null} />
      <ModeSelector
        modes={modes}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />
    </div>
  );
}
