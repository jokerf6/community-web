import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./Modal.css";
import { CHANGEROLE_LINK } from "../../../constants";

export default function End({
  allUsers,
  setAllUsers,
  show,
  number,
  onHide,
  id,
  setFetchAgin,
}) {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });
  async function EndSession() {
    await fetch(CHANGEROLE_LINK + `/${id}/endSession`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setFetchAgin((prevState) => !prevState);
  }
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Body className="body-modal" style={{ padding: "10%" }}>
        <h4>Are You Sure ?</h4>
        <p className="paragraph">You want to end session for this user</p>
        <p className="end-number">{number}</p>
        <button onClick={onHide} className="cancel">
          No
        </button>
        <button
          onClick={() => {
            onHide();
            EndSession();
          }}
          className="choose"
        >
          Yes
        </button>
      </Modal.Body>
    </Modal>
  );
}
