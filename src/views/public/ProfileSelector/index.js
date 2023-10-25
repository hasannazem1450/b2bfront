import { useState, useEffect } from "react"
import { Row } from "reactstrap"
import ProfileChose from "./ProfileSelectorChose"
import  ProfileTable  from './ProfileSelectorTable'
import Slider from './slider'
import  './profileSelector.css'
import { getProfileData, getEventinfoData } from "./store/ProfileStore"
import { useDispatch, useSelector } from "react-redux"

export default function ProfileSelector() {
  const dispatch = useDispatch()

  const store = useSelector((state) => state.profileStore)
  console.log("ProfileSelector")
     console.log(store)


  function doEverything() {
    return dispatch => (
        dispatch(getProfileData()).then(() => {
          dispatch(getEventinfoData())
        }
       )
    )
  }
  
  useEffect(() => {
    dispatch(doEverything())
  }, [])

  if (store.profile.length === 0) { dispatch(getProfileData()) }
   
  return (
    <Row className='match-height'>
        <Slider dataSlider={store.slideImages}/>
       <ProfileChose/>      
       <ProfileTable profileData={store.profile}/>
           </Row>
  )
}
