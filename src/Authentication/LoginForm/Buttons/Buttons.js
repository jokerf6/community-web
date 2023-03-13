import React from "react";
import Styles from "./Buttons.module.css";
import Shared from "../Modals/ResetModal/Reset.module.css";
import img from "../Modals/ResetModal/lock 1.png";
import Change from "../Modals/ChangeModal/Change";
import Default from "../Modals/DefaultModal/Default";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Congrats from "../Modals/CongratsModal/Congrats";

export default function Buttons() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  function handleClick() {
    setModalShow(true);
  }

  return (
    <div className={Styles.buttons}>
      <div>
        <Change />
      </div>
      <div>
        <Default show={modalShow2} onHide={() => setModalShow2(false)} />
      </div>
    </div>
  );
}
