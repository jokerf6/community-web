import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import img from './add-user 1.png'
import Calendar from 'react-calendar';
import './Modal.css'
import 'react-calendar/dist/Calendar.css';
import Congrats from '../../../Authentication/LoginForm/Modals/CongratsModal/Congrats'



function CalendarModal(props) {
    const [modalShow, setModalShow] = useState(false);
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState(new Date());
    console.log(date);
    const URL = 'http://127.0.0.1:4001/user/add';
    
    const myHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    });
    function postUser() {
        const item = {
            number: props.number,
            extendDate: date,
        }
        console.log(item);
        fetch(URL, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(item),
        })
        .then((res) => {
            res.json()
                .then((data) => {
                    console.log(data)
                })
        })
        .catch(err => {
            console.log(err)
        });
    }

    return ( 
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="calendar-container">
                    <Calendar onChange={setDate} value={date} />
                </div>
                <button className='done'
                    onClick={()=> {
                            setModalShow(true);
                            postUser();
                            window.location.reload();
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


export default function Save(props) {
    

    const [modalShow, setModalShow] = React.useState(false);
    const [number, setNumber] = useState('')

    return (
        <Modal
            {...props}
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
                <button onClick={props.onHide} className = 'cancel'>Cancel</button>
                <button onClick={()=> setModalShow(true)}
                    className = 'choose'
                >Choose Time</button>
                {modalShow &&
                    <CalendarModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    number={number}
                    />
                }
                {/* <CalendarModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}
            </Modal.Body>
        </Modal>
    );
}