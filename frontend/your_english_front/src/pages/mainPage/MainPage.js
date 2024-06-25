import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./mainPage.module.css";
import SideBar from "./SideBar";
export default function MainPage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <Outlet />
    </div>
  );
}
