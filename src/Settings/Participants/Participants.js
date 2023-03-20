import React from 'react'
import './Participants.css'
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoStarSharp, IoStarOutline } from "react-icons/io5";
import Save from './Modals/Save';
import End from './Modals/End'

export default function Participants() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    return (
        <div className='participant'>
            <div className='search-bar'>
                <div className='search-input'>
                    <BiSearch className='search-img'/>
                    <input
                        placeholder='Search for any user'
                    />
                </div>
                <div className='btn-div'>
                    <button className='search-btn'
                        onClick={() => setModalShow(true)}
                    >
                        Add user
                    </button>
                    <Save
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
            <div className='users'>
                <div className='user'>
                    <FaUser className='user-avatar'/>
                    <h5 className='number'>01147837993</h5>
                    <IoStarSharp className='full-star'/>
                    <button className='end-session'
                        onClick={() => setModalShow2(true)}
                    >End session</button>
                    <End
                        show={modalShow2}
                        onHide={() => setModalShow2(false)}
                    />
                </div>
                <div className='user'>
                    <FaUser className='user-avatar' />
                    <div className='number'>
                        <h5 >01147837993</h5>
                        <p>
                            <span className='date'>from 1/2/2023</span>
                            <span className='date'>to 2/2/2023</span>
                        </p>
                    </div>
                    <IoStarOutline className='full-star' />
                    <button className='extend'>Extend</button>
                    <button className='end-session'>End session</button>
                </div>
                <div className='user'>
                    <FaUser className='user-avatar' />
                    <div className='number'>
                        <h5 className='red-extent'>01147837993</h5>
                        <p className='red-extent'>
                            <span className='date'>from 1/2/2023</span>
                            <span className='date'>to 2/2/2023</span>
                        </p>
                    </div>
                    <button className='extend'>Extend</button>
                </div>
            </div>
        </div>
    )
}
