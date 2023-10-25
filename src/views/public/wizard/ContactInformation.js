import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight } from "react-feather"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { isObjEmpty } from "@utils"
import picture from "@src/assets/images/banner/contact.png"
import { createProfile } from "@api/profile"
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Checkbox } from "@material-ui/core"
import { getCityData } from "./store/wizardStore"
import { useDispatch, useSelector } from "react-redux"


const defaultValues = {
  CEOMobile: "09127209671",
  CEOEmail: "madar@modir.com",
  aboutUs: "about us test text",
  phoneNumber: "02144466632",
  fax: "02144466632",
  email: "alaki@email.com",
  website: "",
  province: "",
  city: "",
  industrialPark: "",
  address: "",
  logo : "",
  headerpic :"",
  postalcode: ""
}

const provinceWhiteList = ["", "undefined"]
const cityWhiteList = ["", "undefined"]
const industrialParkWhiteList = ["undefined"]
// const onSubmit = async (data) => {
//   if (isObjEmpty(errors)) {
//     const finalData = { ...stepper.storedData, ...data }
     
//     try {
//       const response = await createProfile({
//         smeName: finalData.companyName,
//         smeTypeId: finalData.companyType,
//         nationalCode: finalData.nationalID,
//         smeRaterId: finalData.ratingExecutor,
//         status: finalData.Status,

//         businessCode: finalData.businessID,
//         managerName: finalData.CEO,
//         registerNumber: finalData.registrationNumber,
//         economyCode: finalData.economicCode,
//         smeRankId: finalData.companyRating,
//         permitNo: finalData.activityLicenseNumber,

//         managerPhoneNumber: finalData.CEOMobile,
//         managerEmail: finalData.CEOEmail,
//         aboutUs: finalData.aboutUs,
//         tellNumber: finalData.phoneNumber,
//         faxNumber: finalData.fax,
//         smeEmail: finalData.email,
//         smeWebsite: finalData.website,
//         //cityId: 2,
//         cityId: finalData.city,
//         industrialParkId: finalData.industrialPark,
//         address: finalData.address,
//         logo : finalData.logo,
//         headerpic : finalDate.headerpic,
//         postalcode : finalDate.postalcode
//       })
      
//       console.log(response)
//     } catch (error) {
//       console.log(error.response.data)
//     }

//   }
// }

export default function ContactInformation({ stepper, typeID, hederImage, logoUrl }) {
  const store = useSelector((state) => state.wizardStore) 
console.log(hederImage)
  const dispatch = useDispatch()

const getCitydata = async (e) => {
  try {

    dispatch(getCityData(e.value))
   
  } catch (error) {
    console.log(error.message)
  }
}

  const [isOpened, setIsOpened] = useState(false)

  function toggleIndustrialpark() {
    setIsOpened(wasOpened => !wasOpened)
    // getIndustrialParkData()
  }
  const navigate = useNavigate()
  const { t: translate } = useTranslation("wizard")
  //console.log("this is api test")
  
  const ContactSchema = yup.object().shape({
    postalcode: yup
    .number()
    .min(10, "حداقل 10 کاراکتر")
    .required(),
    CEOMobile: yup
      .string()
      .notRequired()
      .min(11, "(حداقل 11 کاراکتر)")
      .nullable()
      .max(11, "(حداکثر 11 کاراکتر)")
      .transform((value) => (!!value ? value : null)),
    CEOEmail: yup
      .string()
      .email("ایمیل وارد شده صحیح نمی باشد")
      .notRequired()
      .nullable()
      .max(50, "(حداکثر 50 کاراکتر)"),
    aboutUs: yup.string().notRequired().nullable().max(500, "(حداکثر 500 کاراکتر)"),
    phoneNumber: yup.string().notRequired().nullable().max(20, "(حداکثر 20 کاراکتر)"),
    fax: yup.string().notRequired().nullable().max(20, "(حداکثر 20 کاراکتر)"),
    email: yup.string().email("ایمیل وارد شده صحیح نمی باشد").notRequired().nullable().max(50, "(حداکثر 50 کاراکتر)"),
    website: yup.string().url("وبسایت وارد شده صحیح نمی باشد").notRequired().nullable().max(50, "(حداکثر 50 کاراکتر)"),
    province: yup.string().notRequired().nullable().oneOf(provinceWhiteList, "(مقدار انتخاب شده مجاز نمی باشد)"),
    city: yup.string().notRequired().nullable().oneOf(cityWhiteList, "(مقدار انتخاب شده مجاز نمی باشد)"),
    industrialPark: yup
      .string()
      .optional("(اجباری)")
      .oneOf(industrialParkWhiteList, "(مقدار انتخاب شده مجاز نمی باشد)"),
    address: yup.string().notRequired().nullable().max(500, "(حداکثر 500 کاراکتر)")
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "all",
    defaultValues
  })
  const [cityID, setcityID] = useState(0)
  const handelCity = (e) => {
    console.log("city id")
    console.log(e.value)
    setcityID(e.value) 
  }
  const [industerialPark, setindusterialPark] = useState(0)
  const handeindusterialPark = (e) => {
    console.log("industerialPark id")
    console.log(e.value)
    setindusterialPark(e.value) 
  }

  const goPrev = (e) => {
    e.preventDefault()
    stepper.previous()
  }
  const onSubmit = async (data) => {
    alert("asdasd")
    console.log(data)
    if (isObjEmpty(errors)) {
    const finalData = { ...stepper.storedData, ...data }
    console.log("finalData")
    const user = JSON.stringify({
      smeName: finalData.companyName,
      smeTypeId: typeID,
      nationalCode: finalData.nationalID,
      smeRaterId: 1,
      status: finalData.Status,

      businessCode: finalData.businessID,
      managerName: finalData.CEO,
      registerNumber: finalData.registrationNumber,
      economyCode: finalData.economicCode,
      smeRankId: finalData.companyRating,
      permitNo: finalData.activityLicenseNumber,

      managerPhoneNumber: finalData.CEOMobile,
      managerEmail: finalData.CEOEmail,
      aboutUs: finalData.aboutUs,
      tellNumber: finalData.phoneNumber,
      faxNumber: finalData.fax,
      smeEmail: finalData.email,
      smeWebsite: finalData.website,
      //cityId: 2,
      cityId: cityID,
      industrialParkId: industerialPark,
      address: finalData.address,
      logo : finalData.logo,
      headerpic : finalData.headerpic,
      postalcode : finalData.postalcode
    })
    console.table(user)

    try {
            const response = await createProfile({
              smeName: finalData.companyName,
              smeTypeId: typeID,
              nationalCode: finalData.nationalID,
              smeRaterId: 1,
              status: finalData.Status,
        
              businessCode: finalData.businessID,
              managerName: finalData.CEO,
              registerNumber: finalData.registrationNumber,
              economyCode: finalData.economicCode,
              smeRankId: finalData.companyRating,
              permitNo: finalData.activityLicenseNumber,
        
              managerPhoneNumber: finalData.CEOMobile,
              managerEmail: finalData.CEOEmail,
              aboutUs: finalData.aboutUs,
              tellNumber: finalData.phoneNumber,
              faxNumber: finalData.fax,
              smeEmail: finalData.email,
              smeWebsite: finalData.website,
              //cityId: 2,
              cityId: cityID,
              industrialParkId: industerialPark,
              address: finalData.address,
              logo : finalData.logo,
              headerpic : finalData.headerpic,
              postalcode : finalData.postalcode
            })
            
            console.log(response)
          } catch (error) {
            console.log(error.response.data)
          }
    console.log("steap3")
    console.log(data)
    console.log(stepper.storedData)
    }
  }
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='content-header'>
          <h5 className='mb-0'>{translate("Contact Information")}</h5>
          <small className='text-muted'>{translate("Enter Your Contact Information.")}</small>
        </div>
        <Row className='mb-1' style={{ minHeight: 550 }}>
          <Col lg='6'>
            <Row>
              <Col md='6'>
                <Col className='mb-1'>
                  <Label for='CEOMobile' className='form-label'>
                    {translate("CEO Mobile")}{" "}
                    {errors.CEOMobile && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.CEOMobile.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='CEOMobile'
                    name='CEOMobile'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='number'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='CEOEmail' className='form-label'>
                    {translate("CEO Email")}{" "}
                    {errors.CEOEmail && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.CEOEmail.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='CEOEmail'
                    name='CEOEmail'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='email'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='aboutUs' className='form-label'>
                    {translate("About Us")}{" "}
                    {errors.aboutUs && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.aboutUs.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='aboutUs'
                    name='aboutUs'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='textarea'
                        rows='1'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='phoneNumber' className='form-label'>
                    {translate("Phone Number")}{" "}
                    {errors.phoneNumber && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.phoneNumber.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='phoneNumber'
                    name='phoneNumber'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='number'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='fax' className='form-label'>
                    {translate("Fax")}{" "}
                    {errors.fax && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.fax.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='fax'
                    name='fax'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='number'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='fax' className='form-label'>
                    {translate("postalCode")}{" "}
                    {errors.fax && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.fax.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='postalCode'
                    name='postalCode'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='number'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Col>
              <Col md='6'>
                <Col className='mb-1'>
                  <Label for='email' className='form-label'>
                    {translate("Email")}{" "}
                    {errors.email && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.email.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='email'
                    name='email'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='email'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='website' className='form-label'>
                    {translate("Website")}{" "}
                    {errors.website && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.website.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='website'
                    name='website'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='text'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col className='mb-1'>
                  <Label for='province' className='form-label'>
                    {translate("Province")}{" "}
                    {errors.province && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.province.message}
                      </FormFeedback>
                    )}
                  </Label>
                  
                  <Select options={store.province} 
                  onChange={ getCitydata}
                   />
                  
                </Col>
                
                <Col className='mb-1'>
                  <Label for='city' className='form-label'>
                    {translate("City")}{" "}
                    {errors.city && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.city.message}
                      </FormFeedback>
                    )}
                  </Label>
                 <Select options={store.city} onChange={handelCity} />
                </Col>
                <Col className='mb-1'>
                <Checkbox onClick={toggleIndustrialpark}></Checkbox>
                <Label for='industrialPark' className='form-label'>
                    {translate("Is in Industrial Park?")}{" "}
                    {errors.industrialPark && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.industrialPark.message}
                      </FormFeedback>
                    )}
                  </Label>
                 
                </Col>
                <Col className='mb-1'></Col>
                
                {isOpened && (<Col className='mb-1'>
                  <Label for='industrialPark' className='form-label'>
                    {translate("Industrial Park")}{" "}
                    {errors.industrialPark && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.industrialPark.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Select options={store.Industrial} onChange={handeindusterialPark} />
                </Col>)}
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Col className='mb-1'>
                  <Label for='address' className='form-label'>
                    {translate("Address")}{" "}
                    {errors.address && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.address.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='address'
                    name='address'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='textarea'
                        rows='1'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Col>
            </Row>
          </Col>
          <Col lg='6' className='d-none d-lg-block'>
            <img src={picture} className='w-100' style={{ height: 400 }} />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline onClick={goPrev}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>{translate("Previous")}</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>{translate("Submit")}</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
          {/* <Button  onClick={getIndustrialParkData} color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>{"amin"}</span>
          </Button> */}
        </div>
      </Form>
    </Fragment>
  )
}
