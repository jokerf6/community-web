import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Styles from "../ResetModal/Reset.module.css";
import img from "../ResetModal/lock 1.png";
import Congrats from "../CongratsModal/Congrats";
import Shared from "../../Buttons/Buttons.module.css";
import Shared2 from "../../Form.module.css";
import sharedStyles from "../../../../General/loading/loading.module.css";
import Img from "../../../../General/loading/images/loading.gif";
import Img2 from "../CongratsModal/112766-celebrate.gif";

import { CHANGE_LINK } from "../../../../constants";
import { ErrorMessage, Formik } from "formik";
export default function Change(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const [loading, setloading] = React.useState(false);
  const [passErr, setpassErr] = React.useState("");
  const [defPassErr, setdefPassErr] = React.useState("");
  const [phoneErr, setphoneErr] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  function handleClick() {
    setModalShow(true);
  }
  function hide() {
    setSuccess(false);

    setModalShow(false);
  }
  function successClick() {
    setSuccess(false);
    setModalShow(false);
  }

  function successHide() {}
  return (
    <div>
      <button className={Shared.btn} onClick={handleClick}>
        Change Password
      </button>
      <div>
        <Modal
          show={modalShow}
          onHide={hide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {success ? (
            <div className={Styles.modal2}>
              <div className={Styles.first}>
                <h4>Reset Password</h4>
                <p className={Styles.paragraph}>
                  Ask the admin to give you your code
                </p>
                <img
                  src={Img2}
                  className={Styles.congImage}
                  alt=""
                  style={{
                    width: "40%",
                  }}
                />
                <button
                  className={Styles.done}
                  onClick={successClick}
                  onHide={successHide}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className={Styles.modal2}>
              <div className={Styles.first}>
                <img
                  src={img}
                  className={Styles.image}
                  alt=""
                  style={{
                    width: "40%",
                  }}
                />
                <h4 className={Styles.title}>Reset Password</h4>
                <p className={Styles.paragraph}>
                  Ask the admin to give you your code
                </p>
              </div>
              <Formik
                initialValues={{
                  number: "",
                  defaultPassword: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.number) {
                    errors.number = "Required";
                  }
                  if (!values.defaultPassword) {
                    setdefPassErr("Required");
                  }
                  if (!values.password) {
                    setpassErr("Required");
                  }
                  if (values.password) {
                    setpassErr("");
                  }
                  if (values.defaultPassword) {
                    setdefPassErr("");
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(
                    values.number,
                    values.defaultPassword,
                    values.password
                  );
                  handleFormSubmit(
                    values.number,
                    values.defaultPassword,
                    values.password
                  );
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
                        <input
                          type="phone"
                          name="number"
                          placeholder="Type Your Number Here"
                          className={Styles.input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.number}
                        />
                      </div>
                    </div>
                    <ErrorMessage name="number">
                      {(msg) => (
                        <p className={Shared2.err2}>
                          {errors.number || phoneErr}
                        </p>
                      )}
                    </ErrorMessage>
                    <div className={Styles.formItem}>
                      <div>
                        <input
                          type="password"
                          name="defaultPassword"
                          placeholder="Type Your Default Password Here"
                          className={Styles.input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.defaultPassword}
                        />
                      </div>
                    </div>
                    <p
                      className={defPassErr === "" ? Styles.err3 : Shared2.err2}
                    >
                      {defPassErr}
                    </p>
                    <div className={Styles.formItem}>
                      <div>
                        <input
                          type="password"
                          name="password"
                          placeholder="Type Your Password Here"
                          className={Styles.input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                      </div>
                    </div>
                    <p className={passErr === "" ? Styles.err3 : Shared2.err2}>
                      {passErr}
                    </p>
                    <div>
                      <button
                        className={Styles.change}
                        type="submit"
                        disabled={loading}
                      >
                        Change
                        {loading ? (
                          <img
                            src={Img}
                            className={sharedStyles.load}
                            style={{
                              width: "40%",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );

  /****************************************************************** */
  async function handleFormSubmit(number, defaultPassword, password) {
    console.log(number, password, defaultPassword);
    let numberValue = number;
    let passwordValue = password;
    let defaultPasswordValue = defaultPassword;

    const person = {
      number: numberValue,
      defaultPassword: defaultPasswordValue,
      password: passwordValue,
    };

    let requestJson = JSON.stringify(person);
    console.log("zzzzzz" + requestJson);
    await changeUser(requestJson);
  }

  function onchangeResponse(json) {
    console.log(json);
    let status = json.type;
    if (status == "Success") {
      setSuccess(true);
      setpassErr("");
    } else {
      setpassErr(status);
    }
    // console.log(cookies.get("username")); // Pacman
  }
  async function changeUser(requestJson) {
    setloading(true);
    await fetch(CHANGE_LINK, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: requestJson,
    })
      .then((response) => response.json())
      .then((json) => onchangeResponse(json));
    setloading(false);
  }
}
