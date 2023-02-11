import React from 'react';
import picc from '../static/frontimage/slider.jpg';
import "./SliderModule.css";

function Slider() {
  return (
    <div className='slider'>
        
        <img src={picc}/>
        <h1>леденцы YUMEARTH в Алматы</h1>
        
    </div>
  )
}

export default Slider