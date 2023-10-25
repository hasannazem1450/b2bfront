import { useRef, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FileText } from "react-feather"
import Wizard from "@components/wizard"
import GeneralInformation from "./GeneralInformation"
import IDInformation from "./IDInformation"
import ContactInformation from "./ContactInformation"
import MemberInformation from "./MemberInformation"
import News from "./News"
import Product from './Product'
import { getProvinceData, getIndustrialParkData, getPositionData } from "./store/wizardStore"
import { useDispatch, useSelector } from "react-redux"

const WizardModern = () => {
  const store = useSelector((state) => state.wizardStore) 
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)
  const { t: translate } = useTranslation("wizard")
  const [isProduct, setisProduct] = useState(false)
  const [isService, setisService] = useState(false)
  const [typeID, settypeID] = useState("0")
  const [isenginearingService, setenginearingService] = useState(false)
  const [logoUrl, setlogoUrl] = useState("")
  const [hederImage, sethederImage] = useState("")
  const submitForm = (data) => {
    console.log(data)
  }

  const steps = [
    {
      id: "general-information",
      title: translate("General Information"),
      icon: <FileText size={18} />,
      content: <GeneralInformation setisProduct={setisProduct} isProduct={isProduct} 
      setisService={setisService} isService={isService}
      setenginearingService={setenginearingService} isenginearingService={isenginearingService}
      settypeID={settypeID} typeID={typeID}
      setlogoUrl={setlogoUrl} sethederImage={sethederImage}
      type='wizard-modern' stepper={stepper} />,
      enable:true
    },
    {
      id: "id-information",
      title: translate("ID Information"),
      icon: <FileText size={18} />,
      content: <IDInformation type='wizard-modern' stepper={stepper} />,
      enable:true
    },
    {
      id: "Contact-information",
      title: translate("Contact Information"),
      icon: <FileText size={18} />,
      content: <ContactInformation type='wizard-modern' logoUrl={logoUrl} hederImage={hederImage} typeID={typeID} stepper={stepper} onSubmitForm={submitForm} />,
      enable:true
    },
    {
      id: "new-information",
      title: translate("newInformation"),
      icon: <FileText size={18} />,
      content: <News type='wizard-modern'  />,
      enable:true
    },
    {
      id: "add-product",
      title: translate("product"),
      icon: <FileText size={18} />,
      content: <Product type='wizard-modern'   />,
      enable:isProduct
    },
    {
      id: "add-service",
      title: translate("enginearingService"),
      icon: <FileText size={18} />,
      content: <Product type='wizard-modern'  />,
      enable:isService
    },
    {
      id: "add-enginearingService",
      title: translate("service"),
      icon: <FileText size={18} />,
      content: <Product type='wizard-modern' />,
      enable:isenginearingService
    },
    {
      id: "member-information",
      title: translate("Member Information"),
      icon: <FileText size={18} />,
      content: <MemberInformation type='wizard-modern'  />,
      enable:true
    }
  ]

  function doEverything() {
    return dispatch => (
        dispatch(getProvinceData()).then(() => {
          dispatch(getIndustrialParkData()).then(() => {
            dispatch(getPositionData())
          })
        }
       )
    )
  }
  useEffect(() => {
    dispatch(doEverything())
  }, [])
  
  return (
    <Wizard
      className='wizard'
      type='vertical'
      ref={ref}
      steps={steps}
      instance={(el) => setStepper(el)}
      options={{
        linear: false
      }}
    />
  )
}

export default WizardModern
