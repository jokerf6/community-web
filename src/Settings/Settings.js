import React from 'react'
import Sidebar from './Navbar/Navbar'
import Header from './Header/Header';
import './settings.css';
import './Navbar/Navbar.css';


export default function Settings() {
    return (
        <div className='settings'>
            <Header />
            <Sidebar />
        </div>
    )   
}
