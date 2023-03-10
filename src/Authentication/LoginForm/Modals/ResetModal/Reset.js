import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Styles from './Reset.module.css';
import img from './lock 1.png';
import Generate from './Generate';

export default function Reset(props) {
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
                        Reset Password
                    </h4>
                    <p className={Styles.paragraph}>Ask the admin to give you your code</p>
                </div>
                <Form>
                    <div className={Styles.formItem}>
                        <div>
                            <input type="text" placeholder="Type Your Number" className={Styles.input} />
                        </div>
                    </div>
                    <div className={Styles.formItem}>
                        <div>
                            <input type="password"  placeholder="Type Your Default Password" className={Styles.input}/>
                        </div>
                    </div>
                </Form>
                <div>
                    <button className={Styles.cancel} onClick={props.onHide}>Cancel</button>
                    <button className={Styles.next} onClick={() => setModalShow(true)}>
                        Next
                    </button>
                    <Generate
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> 
                </div>
            </div>
        </Modal>
    );
}