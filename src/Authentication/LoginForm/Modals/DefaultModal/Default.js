import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Styles from "../ResetModal/Reset.module.css";
import Shared from "../../Buttons/Buttons.module.css";

import img from "../ResetModal/lock 1.png";
import { DEFAULT_LINK } from "../../../../constants";

export default function Default() {
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [Def, setDef] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState("");

  function openModel() {
    setModalShow(true);
  }
  function hide() {
    setModalShow(false);
    setSuccess(false);
    setErr("");
    setDef("");
  }
  return (
    <div>
      <button className={Shared.btn} onClick={openModel}>
        Get Your Default Password
      </button>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={hide}
      >
        <div className={Styles.modal2}>
          <div className={Styles.first}>
            <img src={img} className={Styles.image} alt="" />
            <h4 className={Styles.title}>Default Password</h4>
            <p className={Styles.paragraph}>Get your default password</p>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className={Styles.formItem}>
              <div>
                <input
                  type="text"
                  placeholder="Type Your Number Here"
                  name={"phone"}
                  className={Styles.input}
                />
              </div>
            </div>
            {err !== "" ? <p className={Styles.err}>{err}</p> : undefined}

            {success && err === "" ? (
              <div className={Styles.your}>
                <span>Your default password is</span>
                <span className={Styles.color}>{Def}</span>
              </div>
            ) : undefined}

            <button className={Styles.change} type="submit">
              Done
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );

  /*********************************************************************************** */
  async function handleFormSubmit(e) {
    e.preventDefault(); // to prevent page from refreshing after click on submit button
    if (!success) {
      console.log(e.target.phone.value);
      let numberValue = e.target.phone.value;

      const person = {
        number: numberValue,
      };

      let requestJson = JSON.stringify(person);
      console.log("zzzzzz" + requestJson);
      await getDefault(requestJson);
    }
  }

  function getDefaultResponse(json) {
    console.log(json);
    let status = json.type;
    if (status == "Success") {
      setSuccess(true);
      setDef(json.data.password);
      setErr("");
    } else if (status == "Forbidden") {
      setErr(json.message);
    } else {
      setErr(json.message);
    }
    // console.log(cookies.get("username")); // Pacman
  }
  async function getDefault(requestJson) {
    setloading(true);
    await fetch(DEFAULT_LINK, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: requestJson,
    })
      .then((response) => response.json())
      .then((json) => getDefaultResponse(json));
    setloading(false);
  }
}
