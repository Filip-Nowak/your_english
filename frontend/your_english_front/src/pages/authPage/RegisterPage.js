import React, { useContext, useRef } from "react";
import styles from "./authPage.module.css";
import { register } from "../../http/auth";
import Loading from "../../utils/loading/Loading";
import LoadingContext from "../../context/LoadingContext";
export default function RegisterPage() {
  const mailInput = useRef("");
  const passwordInput = useRef("");
  const nameInput = useRef("");
  const confirmPasswordInput = useRef("");
  const loadingContext = useContext(LoadingContext);
  const handleSubmit = () => {
    loadingContext.setLoading(true);
    register(
      {
        name: nameInput.current,
        email: mailInput.current,
        password: passwordInput.current,
      },
      onRegisterSuccess,
      onRegisterFail,
      onRequestFail
    );
  };
  const onEmailChange = (e) => {
    mailInput.current = e.target.value;
  };
  const onPasswordChange = (e) => {
    passwordInput.current = e.target.value;
  };
  const onNameChange = (e) => {
    nameInput.current = e.target.value;
  };
  const onConfirmPasswordChange = (e) => {
    confirmPasswordInput.current = e.target.value;
  };

  const onRegisterFail = (errors) => {
    loadingContext.setLoading(false);
    console.log("register fail");
    console.log(errors);
  };
  const onRequestFail = (response) => {
    console.log("request fail");
    console.log(response);
  };

  const onRegisterSuccess = () => {
    console.log("register success");
    window.location.href = "/emailSent";
  };
  return (
    <div>
      <div className={styles.absoluteLogo}>your english</div>
      <div className={styles.container}>
        <div className={styles.title}>register</div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            onChange={onNameChange}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            onChange={onConfirmPasswordChange}
          />
          <button className={styles.btn} onClick={handleSubmit}>
            register
          </button>
        </div>
        <div className={styles.newAccount}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}
