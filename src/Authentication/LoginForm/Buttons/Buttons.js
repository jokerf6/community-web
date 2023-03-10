import React from "react";
import Styles from './Buttons.module.css'
import Change from "../Modals/ChangeModal/Change";
import Default from "../Modals/DefaultModal/Default";


export default function Buttons() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    return (
        <div className={Styles.buttons}>
            <div>
                <button className={Styles.btnone} >Login</button>
            </div>
            <div >
                <button className={Styles.btn} onClick={() => setModalShow(true)}>
                    Change Password
                </button>
                <Change
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <div>
                <button className={Styles.btn} onClick={() => setModalShow2(true)}>
                    Get Your Default Password
                </button>
                <Default
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                />
            </div>
        </div>
    );
}


