import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Styles from '../ResetModal/Reset.module.css';
import img from '../ResetModal/lock 1.png';
import Congrats from '../CongratsModal/Congrats'

export default function Change(props) {
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
                            <input type="text" placeholder="Type Your Number Here" className={Styles.input} />
                        </div>
                    </div>
                    <div className={Styles.formItem}>
                        <div>
                            <input type="password"  placeholder="Type Your Default Password Here" className={Styles.input}/>
                        </div>
                    </div>
                    <div className={Styles.formItem}>
                        <div>
                            <input type="password"  placeholder="Type Your Password Here" className={Styles.input}/>
                        </div>
                    </div>
                </Form>
                <div>
                    <button className={Styles.change} onClick={() => setModalShow(true)}>
                        Change
                    </button>
                    <Congrats
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </Modal>
    );
}