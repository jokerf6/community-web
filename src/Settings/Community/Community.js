import React from 'react'
import './Community.css'
import Savebar from './Savebar'

export default function Community() {
    return (
        <div className='community'>
            <div>
                <p>Admin default password</p>
                <Savebar/>
            </div>
            <div>
                <p>User default password</p>
                <Savebar/>
            </div>
        </div>
    )
}
