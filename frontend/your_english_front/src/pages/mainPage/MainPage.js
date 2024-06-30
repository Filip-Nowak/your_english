import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./mainPage.module.css";
import SideBar from "./SideBar";
export default function MainPage() {
  const { userResponse, wordbasesResponse } = useLoaderData();
  const user = userResponse.data;
  const wordbases = wordbasesResponse.data;
  console.log(user, wordbases);
  return (
    <div className={styles.container}>
      <SideBar wordbases={wordbases} name={user.name} />
      <Outlet />
    </div>
  );
}
