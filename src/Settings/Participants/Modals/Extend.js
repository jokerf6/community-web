import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import { Toast } from "react-bootstrap";

import "./Modal.css";
import "react-calendar/dist/Calendar.css";

export default function Extend({ show, onHide, id, setFetchAgin }) {
  const [value, onChange] = useState(new Date());
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });
  function ExtendUser() {
    const date = new Date();
    const date2 = new Date(value);

    date2.setHours(date.getHours());
    date2.setMinutes(date.getMinutes());
    date2.setSeconds(date.getSeconds());

    const item = {
      extendDate: date2,
    };
    console.log(item);
    fetch(`http://148.72.245.122:4001/user/${id}/extendDate`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(item),
    })
      .then((res) => {
        res.json().then((data) => {
          if (res.status !== 200) {
            setToast(true);
            setError(data.message);
          } else {
            console.log(data);
            onHide();
          }
        });
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
      onHide={() => onHide}
      className="modal"
    >
      <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
      <Modal.Body>
        <div className="calendar-container">
          <Calendar onChange={onChange} value={value} />
        </div>
        <button
          className="done"
          onClick={() => {
            ExtendUser();
          }}
        >
          Add
        </button>
      </Modal.Body>
    </Modal>
  );
}
