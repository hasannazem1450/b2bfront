import React, {useState, useEffect} from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import {getEventinfo} from "@api/mainApis"
//import dataSlider from './dataSlider'

export default function Slider({dataSlider}) {
    console.log("dataSlider")
    console.log(dataSlider)
    const [Eventinfo, setEventinfo] = useState([])
    
    const [slideIndex, setSlideIndex] = useState(1)
    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1)
        } else if (slideIndex === dataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        } else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    
    return (
        <div className='cardSlider'>
        <div className="container-slider">
            { dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}  >
                        <img  src={obj.photo} />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: dataSlider.length}).map((item, index) => (
                    <div 
                    key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
        </div>
    )
}