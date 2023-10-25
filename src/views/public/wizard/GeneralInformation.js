import { Fragment, useState } from "react"
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight, Check, X } from "react-feather"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { isObjEmpty, selectThemeColors, messageOption } from "@utils"
import picture from "@src/assets/images/banner/general.png"
import { Checkbox } from "@material-ui/core"
import FileUploaderLogo from "./FileUploaderLogo"


const defaultValues = {
  companyName: "نام شرکت",
  companyType: "",
  nationalID: "",
  ratingExecutor: "",
  Status: true
}

const companyTypeWhiteList = [{ value: "1", title: "دانش بنیان" }]

const ratingExecutorWhiteList = [
  // { value: "", title: "" },
  { value: "9", title: "بهین یاب" }
]
// const StatusWhiteList = [
//   { value: true, title: "فعال" },
//   { value: false, title: "غیر فعال" }
// ]

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className='form-check-label' htmlFor={htmlFor}>
      <span className='switch-icon-left'>
        <Check size={14} />
      </span>
      <span className='switch-icon-right'>
        <X size={14} />
      </span>
    </Label>
  )
}

export default function GeneralInformation(props) {
  const [logoUrl, setlogoUrl] = useState("")
  const [hederImage, sethederImage] = useState("")
  const { t: translate } = useTranslation("wizard")


  const GeneralSchema = yup.object().shape({
    companyName: yup.string().required("(اجباری)").min(2, "(حداقل 2 کاراکتر)").max(50, "(حداکثر 50 کاراکتر)"),
    // companyType: yup
    //   .string()
    //   .notRequired()
    //   .nullable()
    //   .oneOf(
    //     companyTypeWhiteList.map((item) => item.value),
    //     "(مقدار انتخاب شده مجاز نمی باشد)"
    //   ),
    nationalID: yup.string().required("(اجباری)").min(10, "(حداقل 10 کاراکتر)").max(12, "(حداکثر 12 کاراکتر)"),
    // ratingExecutor: yup
    //   .string()
    //   .notRequired()
    //   .nullable()
    //   .oneOf(
    //     ratingExecutorWhiteList.map((item) => item.value),
    //     "(مقدار انتخاب شده مجاز نمی باشد)"
    //   ),
    Status: yup.boolean().notRequired()
    // .required("(اجباری)")
    // .oneOf(
    //   StatusWhiteList.map((item) => item.value),
    //   "(مقدار انتخاب شده مجاز نمی باشد)"
    // )
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(GeneralSchema)
  })

 
  const checkTypeID  = () => {

 if (props.isProduct && props.isService && props.isenginearingService) {
      props.settypeID("123")
    } else if (props.isProduct && props.isService && !props.isenginearingService) {
      props.settypeID("12")
    } else if (props.isProduct && !props.isService && props.isenginearingService) {
      props.settypeID("13")
    } else if (!props.isProduct && props.isService && props.isenginearingService) {
      props.settypeID("23")
    } else if (props.isProduct) {
      props.settypeID("1")
    } else if (props.isService) {
      props.settypeID("2")
    } else if (props.isenginearingService) {
      props.settypeID("3")
    } else if (!props.isProduct && !props.isService && !props.isenginearingService) {
     alert("اتنخاب نوع الزامی است")
 
    }
  }

  const checkHasProduct = (state) => {
    props.setisProduct(!props.isProduct)
    console.log(props.isProduct)
  
    console.log(props.typeID)
  
  }

  const checkHasSertvice = (state) => {
    props.setisService(!props.isService)
    console.log(props.isService)
   
    console.log(props.typeID)
  }
  const checkenginearingService = (state) => {
    props.setenginearingService(!props.isenginearingService)
    console.log(props.isenginearingService)
    
    console.log(props.typeID)
  }

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      props.stepper.storedData = data
      console.log("steap1")
      console.log(data)
      props.sethederImage(hederImage)
      props.setlogoUrl(logoUrl)
      checkTypeID()
      if (props.isProduct || props.isService || props.isenginearingService) {
        props.stepper.next()
      }

    }
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='content-header'>
          <h5 className='mb-0'>{translate("General Information")}</h5>
          <small className='text-muted'>{translate("Enter Your General Information.")}</small>
        </div>
        <Row className='mb-1' style={{ minHeight: 550 }}>
          <Col lg='6'>
            <Col className='mb-1'>
              <Label for='companyName' className='form-label'>
                {translate("Company Name")}
                <span className='text-danger'>*</span>{" "}
                {errors.companyName && (
                  <FormFeedback tag='span' className='d-inline'>
                    {errors.companyName.message}
                  </FormFeedback>
                )}
              </Label>
              <Controller
                id='companyName'
                name='companyName'
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Input
                    valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                    invalid={fieldState.error !== undefined}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col className='mb-1'>
              <Label  className='form-label'>
                {translate("selectbussinessType")}
                <span className='text-danger'>*</span>{" "}
              </Label>
           
              <Row>
              <Col className='mb-1'>
                <Checkbox  
                checked={props.isenginearingService} onClickCapture={checkenginearingService} 
                 ></Checkbox>
                <Label for='industrialPark' className='form-label'>
                    {translate("service")}{" "}
                  </Label>
                 
                </Col>
                <Col className='mb-1'>
                <Checkbox 
                checked={props.isProduct} onClickCapture={checkHasProduct}
                ></Checkbox>
                <Label for='industrial' className='form-label'>
                    {translate("industrial")}{" "}
                  </Label>
                 
                </Col>
                <Col className='mb-1'>
                <Checkbox
                 checked={props.isService} onClickCapture={checkHasSertvice}
                 ></Checkbox>
                <Label for='enginearingService' className='form-label'>
                    {translate("enginearingService")}{" "}
                  </Label>
                 
                </Col>
                </Row>
            </Col>
      
            <Col className='mb-1'>
              <Label for='nationalID' className='form-label'>
                {translate("National ID")}
                <span className='text-danger'>*</span>{" "}
                {errors.nationalID && (
                  <FormFeedback tag='span' className='d-inline'>
                    {errors.nationalID.message}
                  </FormFeedback>
                )}
              </Label>
              <Controller
                id='nationalID'
                name='nationalID'
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
              <Label for='raterId' className='form-label'>
                {translate("Rating Executor")}{" "}
                {errors.raterId && (
                  <FormFeedback tag='span' className='d-inline'>
                    {errors.raterId.message}
                  </FormFeedback>
                )}
              </Label>
              <Controller
                id='raterId'
                name='raterId'
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Input
                    type='select'
                    valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                    invalid={fieldState.error !== undefined}
                    {...field}
                  >
                    {ratingExecutorWhiteList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.title}
                      </option>
                    ))}
                  </Input>
                )}
              />
            </Col>

            <Col>
              <FileUploaderLogo sethederImage={sethederImage} setlogoUrl={setlogoUrl} title={"لوگوی شرکت"} />
            </Col>

            <Col>
              <FileUploaderLogo sethederImage={sethederImage} setlogoUrl={setlogoUrl} title={" عکس بالای صفحه"} />
            </Col>

            <Col className='mb-1 d-flex'>
              <Label for='Status' className='form-check-label  me-1 ' style={{ marginTop: "3px" }}>
                {translate("Status")} :
              </Label>
              <Controller
                name='Status'
                control={control}
                render={({ field }) => (
                  <div className='form-switch form-check-primary'>
                    <Input
                      id='Status'
                      defaultChecked
                      style={{width:'45px'}}
                      {...field}
                      type='switch'
                      onChange={(e) => setValue("Status", e.target.checked)}
                    />
                    <CustomLabel htmlFor='Status' />
                  </div>
                )}
              />
            </Col>
          </Col>
          <Col lg='6' className='d-none d-lg-block'>
            <img src={picture} className='w-100' style={{ height: 400 }} />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>{translate("Previous")}</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>{translate("Next")}</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}
