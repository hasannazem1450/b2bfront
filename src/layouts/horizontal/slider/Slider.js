import React, {useState, useEffect} from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import {getEventinfo} from "@api/mainApis"
//import dataSlider from './dataSlider'

export default function Slider() {
    const [Eventinfo, setEventinfo] = useState([])
    const dataSlider2 = async () => {
        try {
          const response = await getEventinfo()
          console.log(response.data.result.list)
          //return response.data
         setEventinfo(response.data.result.list.map(evis => ({
            id: evis.id,
            title: evis.name,
            subTitle:evis.periority,
            imageUrl: evis.photo
        })))
        } catch (error) {
          console.log(error.message)
        }
      }
    console.log(Eventinfo)
    const [slideIndex, setSlideIndex] = useState(1)
    const nextSlide = () => {
        if (slideIndex !== Eventinfo.length) {
            setSlideIndex(slideIndex + 1)
        } else if (slideIndex === Eventinfo.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        } else if (slideIndex === 1) {
            setSlideIndex(Eventinfo.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    useEffect(() => {
        //console.log(domainId);
        dataSlider2()
    
      }, [])
    return (
        <div className='card'>
        <div className="container-slider">
            {Eventinfo.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}  >
                        <img  src={obj.imageUrl} />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: Eventinfo.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
        </div>
    )
}