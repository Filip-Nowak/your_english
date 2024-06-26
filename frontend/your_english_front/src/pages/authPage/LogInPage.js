import React, { useRef } from "react";
import styles from "./authPage.module.css";
import { login } from "../../http/auth";
export default function LogInPage() {
  const mailInput = useRef("");
  const passwordInput = useRef("");
  const handleSubmit = () => {
    login(
      { email: mailInput.current, password: passwordInput.current },
      onLoginSuccess,
      onLoginFail,
      onRequestFail
    );
  };
  const onEmailChange = (e) => {
    mailInput.current = e.target.value;
  };
  const onPasswordChange = (e) => {
    passwordInput.current = e.target.value;
  };
  const onLoginFail = (errors) => {
    console.log("login fail");
    console.log(errors);
  };
  const onLoginSuccess = (token) => {
    console.log("login success");
    console.log(token);
    localStorage.setItem("token", token);
    window.location.href = "/";
  };
  const onRequestFail = (response) => {
    console.log("request fail");
    console.log(response);
  };

  return (
    <div>
      <div className={styles.absoluteLogo}>your english</div>
      <div className={styles.container}>
        <div className={styles.title}>log in</div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            onChange={onEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={onPasswordChange}
          />
          <button className={styles.btn} onClick={handleSubmit}>
            log in
          </button>
        </div>
        <div className={styles.newAccount}>
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
