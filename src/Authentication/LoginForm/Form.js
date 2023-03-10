import React from "react";
import Hello from "./title/Hello";
import Input from "./Input/Input";
import Buttons from "./Buttons/Buttons";
import Styles from "./Form.module.css"

export default function LoginForm(){
    return (
        <div className={Styles.form}>
            <Hello />
            <Input />
            <Buttons />
        </div>
    );
}


