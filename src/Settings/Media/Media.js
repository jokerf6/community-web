import React ,{ useEffect, useState } from 'react';
import './Media.css';

export default function Media() {
    const URL = 'http://127.0.0.1:4001/media'
    const [media, setMedia] = useState([])
    const [numberOfMedia, setNumberOfMedia] = useState()
    const myHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    });
    function getExtension(filename) {
        if (filename) {
            return filename.split(".").pop();
        }
    }
    useEffect(() => {
        getMedia();
    }, [])
    
    function getMedia() {
        fetch(URL + `?take=${{}}&skip=${numberOfMedia}`
            , {
            method: "GET",
            headers: myHeaders,
        })
        .then((response) => response.json())
        .then((data) => {
            setMedia(data.data.media)
            setNumberOfMedia(data.data.allMedia)
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
                        {
                            (   getExtension(photo.mediaUrl).toLowerCase() === "png" ||
                                getExtension(photo.mediaUrl).toLowerCase() === "jpg" ||
                                getExtension(photo.mediaUrl).toLowerCase() === "jpeg") &&
                            (
                                <img src={photo.mediaUrl} className="setting-image" alt ='' />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
