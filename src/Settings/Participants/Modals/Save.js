import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import img from "./add-user 1.png";
import Calendar from "react-calendar";
import "./Modal.css";
import "react-calendar/dist/Calendar.css";
import Congrats from "../../../Authentication/LoginForm/Modals/CongratsModal/Congrats";
import { Toast } from "react-bootstrap";



function CalendarModal({ setAllUsers, show, number, setShow, allUsers, onHide, OnHideCalendar }) {
    const [modalShow, setModalShow] = useState(false);
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [toast, setToast] = useState(false);
    const [error, setError] = useState("");


    console.log(date);
    const URL = 'http://127.0.0.1:4001/user/add';
    
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
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setShow(false)}
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
                    <Calendar onChange={setDate} value={date} />
                </div>
                <button className='done'
                    onClick={()=> {
                            // setModalCongratsShow(true);
                            postUser();
                            OnHideCalendar();
                            onHide();
                        }
                    }
                    
                >Add</button>
                <Congrats
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Modal.Body>
        </Modal>
    );
}


export default function Save({ setAllUsers, show, setShow, allUsers , onHide}) {
    

    const [modalShow, setModalShow] = React.useState(false);
    const [number, setNumber] = useState('')

    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal'
        >
            <Modal.Body className='body-modal'>
                <img src={img} alt='' style={{width: '10%'}} />
                <h4>
                    Add New User
                </h4>
                <p className='paragraph'>
                    Add new user to your community
                </p>
                <input
                    type="text"
                    placeholder="Type User Number"
                    className='input'
                    value={number}
                    onChange={(e)=>{setNumber(e.target.value)}}
                />
            <button onClick={() => setShow(false)} className="cancel">
                Cancel
                </button>
                <button onClick={() => setModalShow(true)}
                    className = 'choose'
                >Choose Time</button>
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
            </Modal.Body>
        </Modal>
    );
}
