import React, { useState } from "react";
import NavButton from "./NavButton";
import styles from "./mainPage.module.css";
import UserInfo from "./UserInfo";
import NavList from "./NavList";
export default function Navigation({ wordbases, name }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className={styles.buttonContainer}>
        <NavButton
          name="Home"
          icon={<i className="fa-solid fa-house"></i>}
          path="/"
        />
        <NavButton
          path={"/practice"}
          name="practice"
          icon={<i className="fa-solid fa-pen-to-square"></i>}
        />

        <NavList
          name="word bases"
          arr={wordbases}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>
      <div className={styles.bottom}>
        <NavButton
          name="settings"
          path={"/settings"}
          icon={<i className="fa-solid fa-gear"></i>}
        />
        <UserInfo name={name} />
      </div>
    </div>
  );
}
