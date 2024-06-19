import React from 'react';
import "./imageSlider.scss"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


const images = [
  'https://i.imgur.com/N9mDXfH.png',
  'https://i.imgur.com/q10Kl1Q.png',
  'https://i.imgur.com/snHd2Er.png',
];

const ImageSlider = () => {
    return (
      <div className="slide-container">
        <Slide>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}/>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}/>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}/>
            </div>
        </Slide>
      </div>
    )
}

export default ImageSlider