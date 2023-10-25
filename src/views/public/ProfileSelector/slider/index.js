import { Container } from "reactstrap"
import slide1 from "@src/assets/images/slide/1.jpg"
import SliderImage from "./Slider"

export default function Slider({dataSlider}) {

  return (
    <div className='slider'>
      <Container fluid >
        <img  src={slide1} style={{width:'66%', height:'300px', marginRight:'33%', position:'absolute'}}/>
        <SliderImage  dataSlider={dataSlider}  />
      </Container> 
     
    </div>
  )
}
