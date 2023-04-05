import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'

export default function End({ show, number, onHide, id, setAllUsers, allUsers }) {
    // console.log('tiu7y', id); 
    const myHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    });
    useEffect(() => {
        EndSession();
    }, [])
    function EndSession() {
        if (id) {
            fetch(`http://127.0.0.1:4001/user/${id}/endSession`, {
                method: "GET",
                headers: myHeaders,
            })
            .then((response) => response.json())
            .then((data) => {
                // setAllUsers((list) => [...list, data["data"]]);
                setAllUsers(allUsers);
                console.log(data.data)
            })
            .catch(err => {
                console.log(err)
            });
        }
    }
    return (
        <Modal
            show = {show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Body className='body-modal'>
            <h4>
                Are You Sure ?
            </h4>
            <p className='paragraph'>
                    You want to end session for this user
            </p>
            <p className='end-number'>
                {number}
            </p>
            <button onClick={onHide} className='cancel'>No</button>
                <button onClick={() => {
                        onHide();
                        EndSession();
                        // setAllUsers();
                    }
                } className='choose'>Yes</button>
        </Modal.Body>
        </Modal>
    );
}