import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import img from "./add-user 1.png";
import Calendar from "react-calendar";
import "./Modal.css";
import "react-calendar/dist/Calendar.css";
import Congrats from "../../../Authentication/LoginForm/Modals/CongratsModal/Congrats";
import { Toast } from "react-bootstrap";



function CalendarModal({ setAllUsers, show, number, setShow, allUsers, onHide, OnHideCalendar, setShow1, setShow2,}) {
    const [modalShow, setModalShow] = useState(false);
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [toast, setToast] = useState(false);
    const [error, setError] = useState("");


  console.log(date);
  const URL = "https://thestockideas.com/api/v1/user/add";

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });
  function postUser() {
    const item = {
      number: number,
      extendDate: date,
    };
    console.log(item);
    fetch(URL, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(item),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(res.status);
          if (res.status !== 200) {
            setToast(true);
            setError(data.message);
          } else {
            setModalShow(true);
            setAllUsers((list) => [...list, data["data"]]);
        }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="def">
      {modalShow ? (
        <Congrats
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setShow1(false);
          }}
        />
      ) : (
        <Modal
          show={show}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setShow1(false)}
        >
          <Toast
            onClose={() => setToast(false)}
            show={toast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Error</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
          <Modal.Body>
            <div className="calendar-container">
              <Calendar onChange={setDate} value={date} />
            </div>
            <button
              className="done"
              onClick={() => {
                postUser();
                OnHideCalendar();
                onHide();
              }}
            >
              Add
            </button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
export default function Save({ setAllUsers, show, setShow, allUsers, onHide }) {
  console.log("/////////////////////////////////////////////////////////");
  const [modalShow, setModalShow] = React.useState(false);
  const [number, setNumber] = useState("");

  return (
    <>
      {modalShow && (
        <CalendarModal
          setAllUsers={setAllUsers}
          show={modalShow}
          number={number}
          setShow1={setModalShow}
          allUsers={allUsers}
        />
      )}
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal"
      >
        <Modal.Body className="body-modal">
          <img src={img} alt="" style={{ width: "10%" }} />
          <h4>Add New User</h4>
          <p className="paragraph">Add new user to your community</p>
          <input
            type="text"
            placeholder="Type User Number"
            className="input"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <button onClick={() => setShow(false)} className="cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              setModalShow(true);
              setShow(false);
            }}
            className="choose"
          >
            Choose Time
          </button>
          {modalShow &&
            <CalendarModal
                    setAllUsers={setAllUsers}
                    show={modalShow}
                    onHide={onHide}
                    number={number}
                    OnHideCalendar = {()=> setModalShow(false)} 
                        // number={number}
                        // onHide={onHide}
                    />
                }
          {/* <CalendarModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}
        </Modal.Body>
      </Modal>
    </>
  );
}
