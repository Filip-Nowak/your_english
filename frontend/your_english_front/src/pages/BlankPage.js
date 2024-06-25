import React from "react";
import { Outlet } from "react-router-dom";

export default function BlankPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
