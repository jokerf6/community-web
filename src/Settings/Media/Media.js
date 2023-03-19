import React from 'react';
import './Media.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from './Rectangle 172.png';
import img2 from './Rectangle 176.png';
import img3 from './Rectangle 177.png';

import ResponsiveGallery from 'react-responsive-gallery';


export default function Media() {
    return (
        <div className='media'>
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
