import React ,{ useEffect, useState } from 'react';
import './Media.css';
import img1 from './Rectangle 172.png';
import img2 from './Rectangle 176.png';
import img3 from './Rectangle 177.png';


export default function Media() {
    const URL = 'http://127.0.0.1:4001/media'
    const [media, setMedia] = useState([])
    const myHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    });
    
    useEffect(() => {
        getMedia();
    }, [])
    
    function getMedia() {
        fetch(URL, {
            method: "GET",
            headers: myHeaders,
        })
        .then((response) => response.json())
        .then((data) => {
            setMedia(data.data.media)
        })
        .catch(err => {
            console.log(err)
        });
    }

    return (
        <div className='media'>
            {
                media.map(photo =>
                    <div>
                        <img src={photo.mediaUrl} className="setting-image" />
                    </div>
                )
            }
        </div>
    )
}
