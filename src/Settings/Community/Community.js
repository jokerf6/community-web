import React, {useEffect, useState} from 'react'
import './Community.css'

import axios from 'axios'



export default function Community() {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await fetch('http://127.0.0.1:4001/changeDefaultPassword') 
    //         const jsonResult = await result.json()
    //         setData(jsonResult)
    //     }

    //     // fetchData();
    // }, [])
    
    // const submitPassword = async () => {
    //     const myData = {
    //         "type": "Success",
    //         "message": "Get passord Successfully",
    //         "data": {
    //             "userPassord": "string",
    //             "rootPassord": "string"
    //         }
    //     }
    //     const result = await fetch('http://127.0.0.1:4001/changeDefaultPassword',
    //         method: 'GEt',
    //         headers: {
                
    //         }
    //     ) 
    // }
    // const access_token = JSON.parse(sessionStorage.getItem('data'));
    const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkODhlMjNmNC1iMGM4LTRhYmYtOTJkOC02NmQ2MTVmYzNjOTMiLCJpZCI6IjJlZTg1OGM4LWRjZWItNDQ5NS1iNWExLTBmNGIwNmFiZDJjOSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3OTM0NjU3MywiZXhwIjoxNjg3OTg2NTczfQ.dLMSa8nZsJLsokK8mVKR-qIXIrZ21aIL79tRRT4jv10';
    const [password, serPassword] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:4001/changeDefaultPassword', {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })
            .then(res => {
            serPassword(res.data)
            console.Console(res)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return (
        <div className='community'>
            <div>
                <p>Admin default password</p>
                <div className='bar'>
                    <input type='text'
                        value={password.userPassword}
                    ></input>
                    <button className='save-btn'> Save</button>
                </div>
            </div>
            <div>
                <p>User default password</p>
                <div className='bar'>
                    <input type='text'
                        value = {password.rootPassword}
                    ></input>
                    <button className='save-btn'> Save</button>
                </div>
            </div>
        </div>
    )
}
