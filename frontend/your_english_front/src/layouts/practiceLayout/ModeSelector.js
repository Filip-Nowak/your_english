import React from "react";
import ModeButton from "./ModeButton";

export default function ModeSelector({ modes, selectedMode, setSelectedMode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "2vh",
      }}
    >
      {modes.map((mode, i) => (
        <ModeButton
          onClick={() => {
            setSelectedMode(i);
          }}
          name={mode.name}
          icon={mode.icon}
          selected={i === selectedMode}
        />
      ))}
    </div>
  );
}
