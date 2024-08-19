import React, { useContext, useRef, useState } from "react";
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
  const [errors, setErrors] = useState({});
  const [confirmError, setConfirmError] = useState(false);
  const handleSubmit = () => {
    setErrors({});
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
    checkPassword();
  };
  const onNameChange = (e) => {
    nameInput.current = e.target.value;
  };
  const onConfirmPasswordChange = (e) => {
    confirmPasswordInput.current = e.target.value;
    checkPassword();
  };

  const onRegisterFail = (errors) => {
    loadingContext.setLoading(false);
    console.log("register fail");
    setErrors(errors);
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
  const checkPassword = () => {
    if (passwordInput.current !== confirmPasswordInput.current) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  };
  return (
    <div>
      <div className={styles.absoluteLogo}>your english</div>
      <div className={styles.container}>
        <div className={styles.title}>register</div>
        <div className={styles.inputContainer}>
          <div className={styles.error}>{errors.name}</div>
          <input
            type="text"
            placeholder="Name"
            className={
              styles.input + " " + (errors.name ? styles.badInput : "")
            }
            onChange={onNameChange}
          />
          <div className={styles.error}>{errors.email}</div>
          <input
            type="text"
            placeholder="Email"
            className={
              styles.input + " " + (errors.email ? styles.badInput : "")
            }
            onChange={onEmailChange}
          />
          <div className={styles.error}>{errors.password}</div>
          <input
            type="password"
            placeholder="Password"
            className={
              styles.input + " " + (errors.password ? styles.badInput : "")
            }
            onChange={onPasswordChange}
          />
          <div className={styles.error}>
            {confirmError ? "password doesn't match" : ""}
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className={
              styles.input + " " + (confirmError ? styles.badInput : "")
            }
            onChange={onConfirmPasswordChange}
          />
          <button
            className={styles.btn}
            onClick={handleSubmit}
            disabled={confirmError}
            style={{ opacity: confirmError ? 0.5 : 1 }}
          >
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
