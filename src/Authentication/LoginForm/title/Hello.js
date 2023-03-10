import React from "react";
import Styles from './Hello.module.css'

export default function Hello(){
    return (
        <div className={Styles.Hello}>
            <h1 className={Styles.title}>Hello Again!</h1>
            <p className={Styles.paragraph}>Join us to be able to see our messages</p>
        </div>
    );
}


