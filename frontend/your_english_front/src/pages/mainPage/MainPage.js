import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./mainPage.module.css";
import SideBar from "./SideBar";
import PhoneHeader from "./PhoneHeader";
export default function MainPage() {
  const { userResponse, wordbasesResponse } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const user = userResponse.data;
  const wordbases = wordbasesResponse.data;
  console.log(user, wordbases);
  return (
    <div className={styles.container}>
      <PhoneHeader showSidebar={setShowSidebar} />
      <SideBar wordbases={wordbases} name={user.name} show={showSidebar} />
      <Outlet />
    </div>
  );
}
