import React from "react";
import Title from "../../components/title/Title";
import { useLoaderData } from "react-router-dom";
export default function SingleWordBaseLayout() {
  const { wordbaseResponse } = useLoaderData();
  if (wordbaseResponse.error) {
    window.location.href = "/wordbases";
    return;
  }
  const wordbase = wordbaseResponse.data;
  return (
    <div>
      <Title>{wordbase.name}</Title>
    </div>
  );
}
