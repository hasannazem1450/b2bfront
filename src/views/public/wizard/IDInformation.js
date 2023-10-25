import { Fragment } from "react"
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight } from "react-feather"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { isObjEmpty } from "@utils"
import picture from "@src/assets/images/banner/id.png"

const defaultValues = {
  businessID: "",
  CEO: "",
  registrationNumber: "",
  economicCode: "",
  companyRating: "",
  activityLicenseNumber: ""
}

const companyRatingWhiteList = [
  { value: "", title: "" },
  { value: "1", title: "A" },
  { value: "2", title: "B" },
  { value: "3", title: "C" },
  { value: "4", title: "D" }
]

export default function IDInformation({ stepper }) {
  const { t: translate } = useTranslation("wizard")

  const IDSchema = yup.object().shape({
    businessID: yup.string().required("(اجباری)").min(12, "(حداقل 12 کاراکتر)").max(12, "(حداکثر 12 کاراکتر)"),
    CEO: yup.string().optional().max(50, "(حداکثر 50 کاراکتر)"),
    registrationNumber: yup.string().required("(اجباری)").max(50, "(حداکثر 50 کاراکتر)"),
    economicCode: yup.string().required("(اجباری)").max(50, "(حداکثر 50 کاراکتر)"),
    companyRating: yup
      .string()
      .notRequired()
      .nullable()
      .oneOf(
        companyRatingWhiteList.map((item) => item.value),
        "(مقدار انتخاب شده مجاز نمی باشد)"
      ),
    activityLicenseNumber: yup.string().required("(اجباری)").max(50, "(حداکثر 50 کاراکتر)")
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(IDSchema)
  })

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      stepper.storedData = { ...stepper.storedData, ...data }
      console.log("steap2")
      console.log(data)
      console.log(stepper.storedData)
      stepper.next()
    }
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='content-header'>
          <h5 className='mb-0'>{translate("ID Information")}</h5>
          <small className='text-muted'>{translate("Enter Your ID Information.")}</small>
        </div>
        <Row className='mb-1' style={{ minHeight: 550 }}>
          <Col lg='6'>
            <Row>
              <Col md='6'>
                <Col className='mb-1'>
                  <Label for='businessID' className='form-label'>
                    {translate("Business ID")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.businessID && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.businessID.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='businessID'
                    name='businessID'
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
                  <Label for='CEO' className='form-label'>
                    {translate("CEO/Owner")}{" "}
                    {errors.CEO && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.CEO.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='CEO'
                    name='CEO'
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
                  <Label for='registrationNumber' className='form-label'>
                    {translate("Registration Number")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.registrationNumber && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.registrationNumber.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='registrationNumber'
                    name='registrationNumber'
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
                  <Label for='economicCode' className='form-label'>
                    {translate("Economic Code")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.economicCode && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.economicCode.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='economicCode'
                    name='economicCode'
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
                  <Label for='companyRating' className='form-label'>
                    {translate("Company Rating")}{" "}
                    {errors.companyRating && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.companyRating.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='companyRating'
                    name='companyRating'
                    control={control}
                    render={({ field, fieldState, formState }) => (
                      <Input
                        type='select'
                        valid={(formState.isSubmitted || fieldState.isTouched) && fieldState.error === undefined}
                        invalid={fieldState.error !== undefined}
                        {...field}
                      >
                        {companyRatingWhiteList.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.title}
                          </option>
                        ))}
                      </Input>
                    )}
                  />
                </Col>
              </Col>
              <Col md='6'>
                <Col className='mb-1'>
                  <Label for='activityLicenseNumber' className='form-label'>
                    {translate("Activity License Number")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.activityLicenseNumber && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.activityLicenseNumber.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='activityLicenseNumber'
                    name='activityLicenseNumber'
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
              </Col>
            </Row>
          </Col>
          <Col lg='6' className='d-none d-lg-block'>
            <img src={picture} className='w-100' style={{ height: 400 }} />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline>
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
