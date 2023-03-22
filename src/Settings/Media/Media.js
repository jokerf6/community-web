import React ,{ useEffect, useState } from 'react';
import './Media.css';
import img1 from './Rectangle 172.png';
import img2 from './Rectangle 176.png';
import img3 from './Rectangle 177.png';
import axios from 'axios';


export default function Media() {
    const [media, setMedia] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:4001/media')
            .then(res => {
                console.log(res)
                setMedia(res.data.media)
            })
            .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div className='media'>
            {
                media.map(m =>
                    <div>
                        <img src={m.messageBody}></img>
                    </div>
                )
            }
            

            
            
            <div>
                <img src={img1}></img>
            </div>
            <div>
                <img src={img2}></img>
            </div>
            <div>
                <img src={img3}></img>
            </div>
            <div>
                <img src={img1}></img>
            </div>
            <div>
                <img src={img2}></img>
            </div>
            <div>
                <img src={img3}></img>
            </div>
        </div>
    )
}
