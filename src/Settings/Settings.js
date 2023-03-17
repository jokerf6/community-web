import React from 'react'
import Sidebar from './Navbar/Navbar'
import Header from './Header/Header'
import Participants from './Participants/Participants'
import './settings.css'


export default function Settings() {
    return (
        <div className='settings'>
            <Header />
            <div className='content'>
                <Sidebar />
                <Participants />
            </div>
        </div>
    )   
}
