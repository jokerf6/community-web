import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import './Modal.css'
import 'react-calendar/dist/Calendar.css';


export default function Extend({show, onHide, id}) {

    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState(new Date());
    // console.log(date);
    // console.log(id);
    // const myHeaders = new Headers({
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    // });
    // useEffect(() => {
    //     ExtendUser();
    // }, [])
    // function ExtendUser() {
    //     const item = {
    //         extendDate: date,
    //     }
    //     console.log(item);
    //     fetch(`http://127.0.0.1:4001/user/${id}/extendDate`, {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: JSON.stringify(item),
    //     })
    //     .then((res) => {
    //         res.json()
    //             .then((data) => {
    //                 console.log(data)
    //             })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    // }
    return (
        <Modal
            show={show}
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
                        // ExtendUser();
                        onHide();
                    }}
                >Add</button>
            </Modal.Body>
        </Modal>
    )
}
