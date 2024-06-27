import React from "react";
import styles from "./mainPage.module.css";
export default function UserInfo({ name }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className={styles.userData}>
      <div
        style={{
          backgroundColor: "red",
          padding: "0.5rem",
          borderRadius: "1rem",
        }}
        onClick={logout}
      >
        <i
          className={"fa-solid fa-right-from-bracket " + styles.logoutIcon}
        ></i>
      </div>

      <div className={styles.userIcon}>
        <i className="fa-solid fa-user"></i>
        <div>{name}</div>
      </div>
    </div>
  );
}
