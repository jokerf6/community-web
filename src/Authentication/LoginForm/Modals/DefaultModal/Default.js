import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Styles from '../ResetModal/Reset.module.css'
import img from '../ResetModal/lock 1.png'

export default function Default(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className={Styles.modal}>
                <div className={Styles.first}>
                    <img src={img}  className = {Styles.image} alt=""/>
                    <h4 className={Styles.title}>
                        Default Password
                    </h4>
                    <p className={Styles.paragraph}>Get your default password</p>
                </div>
                <Form>
                    <div className={Styles.formItem}>
                        <div>
                            <input type="text" placeholder="Type Your Number Here" className={Styles.input} />
                        </div>
                    </div>
                </Form>
                <div className={Styles.your}>
                    <span>
                        Your default password is
                    </span>
                    <span className={Styles.color}>
                        123456
                    </span>
                </div>
                
                <button className={Styles.change} onClick={props.onHide}>
                    Done
                </button>
            </div>
        </Modal>
    );
}