import React from "react";
import Hello from "./title/Hello";
import Input from "./Input/Input";
import Buttons from "./Buttons/Buttons";
import Styles from "./Form.module.css";
import sharedStyles from "../../General/loading/loading.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { ErrorMessage, Formik } from "formik";
import Reset from "./Modals/ResetModal/Reset";
import { SIGNIN_LINK } from "../../constants";
import Img from "../../General/loading/images/loading.gif";
export default function LoginForm() {
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, changeLoading] = React.useState(false);
  const [cookies, setCookie] = useCookies(["access_token", "username"]);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  return (
    <div className={Styles.form}>
      <Hello />

      <Formik
        initialValues={{ phone: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit(values.phone, values.password);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={Styles.formItem}>
              <div>
                <label className={Styles.label}>Username</label>
              </div>
              <div>
                <input
                  type="phone"
                  name="phone"
                  placeholder="Type Your Number"
                  className={Styles.input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
              </div>
            </div>
            <ErrorMessage name="phone">
              {(msg) => <p className={Styles.err}>{errors.phone}</p>}
            </ErrorMessage>

            <div className={Styles.formItem}>
              <div>
                <label className={Styles.label}>Password</label>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Type Your Password"
                  className={Styles.input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
            </div>
            <p className={Styles.err}>{error}</p>
            <div className={Styles.reset}>
              <Reset show={modalShow} onHide={() => setModalShow(false)} />
            </div>
            <div>
              <button className={Styles.btnone} disabled={loading}>
                Login{" "}
                {loading ? <img src={Img} className={sharedStyles.load} /> : ""}
              </button>
            </div>
          </form>
        )}
      </Formik>
      <Buttons />
    </div>
  );
  // -----------------------------------------------------------------------------------------------
  async function handleFormSubmit(phone, password) {
    let phoneValue = phone;
    let passwordValue = password;
    console.log(phoneValue, passwordValue);
    const person = {
      number: phoneValue,
      password: passwordValue,
    };

    let requestJson = JSON.stringify(person);
    console.log("zzzzzz" + requestJson);
    await signinUser(requestJson);
  }

  function onGetSignInResponse(json) {
    let status = json.type;
    console.log(json);
    if (status == "Success") {
      localStorage.setItem("logging", true);
      localStorage.setItem("Access Token", json.data.accessToken);
      localStorage.setItem("number", json.data.userExist.number);
      localStorage.setItem("userId", json.data.userExist.id);
      localStorage.setItem("role", json.data.userExist.role);

      setError("");

      navigate("/room");
    } else if (status != "Success") {
      setError("invalid username or password");
      console.log(error);
    }
    // console.log(cookies.get("username")); // Pacman
  }
  async function signinUser(requestJson) {
    changeLoading(true);
    await fetch(SIGNIN_LINK, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: requestJson,
    })
      .then((response) => response.json())
      .then((json) => onGetSignInResponse(json));
    changeLoading(false);
  }
}
