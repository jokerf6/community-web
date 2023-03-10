import React from "react";
import Form from 'react-bootstrap/Form';
import Styles from './Input.module.css';
import Reset from "../Modals/ResetModal/Reset";

export default function Input() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div>
            <Form>
                <div className={Styles.formItem}>
                    <div>
                        <label className={Styles.label}>Username</label>
                    </div>
                    <div>
                        <input type="text" placeholder="Type Your Number" className={Styles.input} />
                    </div>
                </div>
                <div className={Styles.formItem}>
                    <div>
                        <label className={Styles.label}>Password</label>
                    </div>
                    <div>
                        <input type="password"  placeholder="Type Your Password" className={Styles.input}/>
                    </div>
                </div>
            </Form>
            <div className={Styles.reset}>
                <button className={Styles.resetbtn} onClick={() => setModalShow(true)}>
                    Reset Password?
                </button>
                <Reset
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> 
            </div>
        </div>
    );
}


