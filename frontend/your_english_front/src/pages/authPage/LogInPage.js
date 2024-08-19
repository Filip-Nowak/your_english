import React, { useContext, useRef, useState } from "react";
import styles from "./authPage.module.css";
import { login } from "../../http/auth";
import LoadingContext from "../../context/LoadingContext";
export default function LogInPage() {
  const mailInput = useRef("");
  const passwordInput = useRef("");
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const loadingContext = useContext(LoadingContext);
  const handleSubmit = () => {
    setError(false);
    loadingContext.setLoading(true);
    login(
      { email: mailInput.current, password: passwordInput.current },
      onLoginSuccess,
      onLoginFail,
      onRequestFail
    );
  };
  const onEmailChange = (e) => {
    setError(false);
    mailInput.current = e.target.value;
    if (mailInput.current.length === 0 || passwordInput.current.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const onPasswordChange = (e) => {
    setError(false);
    passwordInput.current = e.target.value;
    if (mailInput.current.length === 0 || passwordInput.current.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const onLoginFail = (errors) => {
    console.log("login fail");
    loadingContext.setLoading(false);
    setError(true);
    console.log(errors);
    passwordInput.current = "";
  };
  const onLoginSuccess = (token) => {
    loadingContext.setLoading(false);
    console.log("login success");
    console.log(token);
    localStorage.setItem("token", token);
    window.location.href = "/";
  };
  const onRequestFail = (response) => {
    loadingContext.setLoading(false);
    console.log("request fail");
    // setError(true);
    console.log(response);
  };
  console.log(mailInput.current.length === 0);
  return (
    <div>
      <div className={styles.absoluteLogo}>your english</div>
      <div className={styles.container}>
        <div className={styles.title}>log in</div>
        <div className={styles.inputContainer}>
          <div className={styles.error}>
            {error ? "email or password was incorrect" : ""}
          </div>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            onChange={onEmailChange}
          />
          <div className={styles.error}></div>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={onPasswordChange}
          />
          <button
            className={styles.btn}
            onClick={handleSubmit}
            disabled={buttonDisabled}
            style={{
              opacity: buttonDisabled ? 0.5 : 1,
            }}
          >
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
