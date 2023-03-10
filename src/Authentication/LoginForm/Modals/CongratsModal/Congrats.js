import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Styles from '../ResetModal/Reset.module.css'
import img from './112766-celebrate.gif'

export default function Congrats(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className={Styles.modal}>
                <div className={Styles.first}>
                    <h4>
                        Reset Password
                    </h4>
                    <p className={Styles.paragraph}>Ask the admin to give you your code</p>
                    <img src={img} className={Styles.congImage} alt="" />
                    <button className={Styles.done} onClick={props.onHide}>Done</button>
                </div>
            </div>
        </Modal>
    );
}