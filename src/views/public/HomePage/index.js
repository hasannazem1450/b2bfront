import "./HomePage.css"
import {useEffect} from "react"
import Slider from "../ProfileSelector/slider"
import { Container } from "reactstrap"
import Carousel from './MultipleSlider'
import {GetlatesProfiles, getEventinfoData}  from "./store/HomeStore"
import { useDispatch, useSelector } from "react-redux"
export default function HomePage() {

  const dispatch = useDispatch()

  const store = useSelector((state) => state.homeStore)
  console.log("HomePage")
     console.log(store)

     function doEverything() {
      return dispatch => (
          dispatch(GetlatesProfiles()).then(() => {
            dispatch(getEventinfoData()) 
          }
         )
      )
    }
    useEffect(() => {
      dispatch(doEverything()).then(() => {
      })
    }, [])

  return (
    <div className='itemSliders'>

      <div style={{marginTop:'100px'}}>
       <Slider dataSlider={store.slideImages}/>
        </div>
        <div style={{marginTop:'70px', direction:'rtl'}}>
       {/* <Carousel  data={store.latesProfile}  title={"محصولات"}  itemNumber={5}/> */}
        </div>
        <div style={{marginTop:'70px', direction:'rtl'}}>
       <Carousel data={store.latesProfile} title={"شرکت ها "} itemNumber={8}/>
        </div>

    </div>
  )
}
