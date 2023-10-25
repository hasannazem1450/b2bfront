import React, { useEffect, useState } from 'react'
import './carousel.css'
import ItemsCarousel from 'react-items-carousel'
import CardItem  from './CardItem'
import lleftArrow from "./icons/arrow.svg"
import companyImage from "./icons/buildings.png"
const Carousel = ({itemNumber, data}) => {

    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const chevronWidth = 20
    const defultImage = (url) => {
     if (url === '') {
       return companyImage 
      } else {
      return url
     }
    }
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={itemNumber}
          gutter={20}
          next-slide
          leftChevron={<img className='btn-slide-left ' src={lleftArrow} />}
          rightChevron={<img className='btn-slide-right' src={lleftArrow} />}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {data.map((obj, index) => {
                return (
                  <CardItem key={index} imageUrl={defultImage(obj.logo)} title={obj.smeName}/>
                )
            })}
          
        </ItemsCarousel>
      </div>
    )
}

export default Carousel

