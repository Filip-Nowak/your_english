import React from "react";
import NavButton from "./NavButton";
import styles from "./mainPage.module.css";
import UserInfo from "./UserInfo";
export default function Navigation() {
  return (
    <div>
      <div className={styles.buttons}>
        <NavButton name="Home" />
        <NavButton name="practice" />
        <NavButton name="word bases" />
      </div>
      <div className={styles.bottom}>
        <NavButton name="settings" />
        <UserInfo />
      </div>
    </div>
  );
}
