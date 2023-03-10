import React from 'react'
import img from '../images/74908-girl-chatting-with-online-friends.gif'
import Styles from './Image.module.css'

export default function Image() {
    return (
        <img src={img}  className = {Styles.image} alt=""/>
    )
}

