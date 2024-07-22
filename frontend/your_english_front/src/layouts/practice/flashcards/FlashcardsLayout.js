import React from "react";
import { useLoaderData } from "react-router-dom";

export default function FlashcardsLayout() {
  const { data } = useLoaderData();
  return <div>FlashcardsLayout</div>;
}
