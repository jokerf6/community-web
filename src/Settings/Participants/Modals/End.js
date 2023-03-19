import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'

export default function Save(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal'
        >
            <Modal.Body className='body'>
                <h4>
                    Are You Sure ?
                </h4>
                <p className='paragraph'>
                    You want to end session for this user
                </p>
                <p className='end-number'>
                    01147837993
                </p>
                <button onClick={props.onHide} className='cancel'>No</button>
                <button onClick={props.onHide} className='choose'>Yes</button>
            </Modal.Body>
        </Modal>
    );
}