import React, {useState} from 'react'
import Sidebar from './Navbar/Navbar'
import Header from './Header/Header';
import './settings.css';
import './Navbar/Navbar.css';

export default function Settings() {

const [modalShow, setModalShow] = useState(false);

    return (
        <div className='settings'>
            <Header />
            <Sidebar />
        </div>
    )   
}
