import React from "react";
import Image from "./LoginImage/Image";
import LoginForm from "./LoginForm/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem("logging")) {
    navigate("/room");
  }
  return (
    <div className={Styles.row}>
      <div className={Styles.col1}>
        <Image />
      </div>
      <div className={Styles.col2}>
        <LoginForm />
      </div>
    </div>
  );
}
