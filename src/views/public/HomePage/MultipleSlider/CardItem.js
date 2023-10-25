import React from 'react'
 import './carousel.css'
 import { Row } from "reactstrap"
 
function CardItem({imageUrl, title}) {
    return (
        <div>
          <div className='cardItem' >
          <Row className='match-height'>
            <img className='cardItemImage' src={imageUrl} ></img>
            <div  >
            <h6 className=' item_texts'>{title}</h6>

          </div>
          </Row>
            </div>
        </div>
    )
}

export default CardItem