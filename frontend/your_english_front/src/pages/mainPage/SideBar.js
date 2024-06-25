import React from "react";
import styles from "./mainPage.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Navigation />
    </div>
  );
}
