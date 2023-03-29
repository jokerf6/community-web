import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./Modal.css";

export default function End({
  allUsers,
  setAllUsers,
  show,
  number,
  onHide,
  id,
}) {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });
  async function EndSession() {
    await fetch(`http://127.0.0.1:4001/user/${id}/endSession`, {
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
    const filter = allUsers.filter((x) => {
      return x["id"] === id;
    });
    const data = allUsers;
    const index = data.indexOf(filter[0]);
    console.log(data[index]);
    const date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    const convertedDate = new Date(now_utc);
    data[index]["active"] = false;
    data[index]["extend"] = convertedDate.toISOString();
    setAllUsers([...data]);
  }
  useEffect(() => {
    // EndSession();
  }, []);
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Body className="body-modal">
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
