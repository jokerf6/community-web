import React from 'react';
import Modal from 'react-bootstrap/Modal';
import img from './add-user 1.png'
// import './Modal.css'
import CalendarModal from './Calendar';

export default function Save(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal'
        >
            <Modal.Body className='body'>
                <img src={img} alt='' className='modal-img' />
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
                />
                <button onClick={props.onHide} className = 'cancel'>Cancel</button>
                <button onClick={()=> setModalShow(true)}
                    className = 'choose'
                >Choose Time</button>
                <CalendarModal 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Modal.Body>
        </Modal>
    );
}