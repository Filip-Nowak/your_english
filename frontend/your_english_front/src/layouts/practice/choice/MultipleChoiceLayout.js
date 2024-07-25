import React from "react";
import Title from "../../../components/title/Title";
import { useLoaderData } from "react-router-dom";

export default function MultipleChoiceLayout() {
  const { response } = useLoaderData();
  console.log(response);
  return (
    <div style={{ width: "100%" }}>
      <Title style={{ color: "#00000099", fontSize: "5rem" }}>
        select answer
      </Title>
    </div>
  );
}
