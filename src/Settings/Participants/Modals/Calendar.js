import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

import Congrats from '../../../Authentication/LoginForm/Modals/CongratsModal/Congrats'

export default function CalendarModal(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [value, onChange] = useState(new Date());
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal'
        >
            <Modal.Body>
                <Calendar
                    onChange={onChange}
                    value={value}
                    className ='calendar'
                />
                <button className='done'
                    onClick={()=> setModalShow(true)}
                >Add</button>
                <Congrats
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                
            </Modal.Body>
        </Modal>
    );
}