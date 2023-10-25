import { Row } from "reactstrap"
import Carousel from "./Carousel"
import './carousel.css'
const MultipleSlider = ({title, itemNumber, data}) => {
  console.log("MultipleSlider")
  console.log(data)
    return (
      <div className="carsuel-container">
        <div  style={{marginLeft:'20px', marginRight:'20px' }}>
          <Row>
            <strong className="product-title"> {title}</strong>
          </Row>
          <Carousel itemNumber={itemNumber} data={data}/>
        </div>
        </div>
    )
}

export default MultipleSlider