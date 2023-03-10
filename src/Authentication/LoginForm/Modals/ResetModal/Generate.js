import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Styles from './Reset.module.css';
import img from './lock 1.png'
import Congrats from '../CongratsModal/Congrats';
export default function Generate(props) {
    const [modalShow, setModalShow] = React.useState(false);
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
                        Generate Password
                    </h4>
                    <p className={Styles.paragraph}>Your password in default now </p>
                </div>
                <Form>
                    <div className={Styles.formItem}>
                        <div>
                            <input type="password" placeholder="Enter Your Password Here" className={Styles.input} />
                        </div>
                    </div>
                </Form>
                <div className={Styles.genrateBtn}>
                    <button className={Styles.change} onClick={() => setModalShow(true)}>
                        Change
                    </button>
                    <Congrats
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> 
                    <button className={Styles.save} onClick={props.onHide}>Save Default</button>
                </div>
            </div>
        </Modal>
    );
}