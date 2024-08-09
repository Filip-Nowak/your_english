import React from "react";
import styles from "./mainPage.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
export default function SideBar({ wordbases, name, show }) {
  return (
    <div className={styles.sidebar + " " + (show ? styles.opened : "")}>
      <Logo />
      <Navigation wordbases={wordbases} name={name} />
    </div>
  );
}
