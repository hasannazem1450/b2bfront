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
    name: "",
    photo: "",
    startdate: "",
    enddate: "",
    periority: ""
}

const periority = [
  { value: "1", title: "1" },
  { value: "2", title: "2" },
  { value: "3", title: "3" },
  { value: "4", title: "4" },
  { value: "5", title: "5" }
]

export default function Eventinfo() {
  const { t: translate } = useTranslation("eventinfo")

  const EventInfoSchema = yup.object().shape({
    name: yup.string().required("(اجباری)"),
    photo: yup.string().optional().max(50, "(حداکثر 50 کاراکتر)"),
    startdate: yup.string().required("(اجباری)").length(10, "(تاریخ را کامل وارد کنید"),
    enddate: yup.string().required("(اجباری)").length(10, "(تاریخ را کامل وارد کنید"),
    periority: yup.string().required("(اجباری)")
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(EventInfoSchema)
  })

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      stepper.storedData = { ...stepper.storedData, ...data }
      stepper.next()
    }
  }

  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='content-header'>
          <h5 className='mb-0'>{translate("name")}</h5>
          <small className='text-muted'>{translate("Enter Your ID Information.")}</small>
        </div>
        <Row className='mb-1' style={{ minHeight: 550 }}>
          <Col lg='6'>
            <Row>
              <Col md='6'>
                <Col className='mb-1'>
                  <Label for='name' className='form-label'>
                    {translate("name")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.name && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.name.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='name'
                    name='name'
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
                  <Label for='photo' className='form-label'>
                    {translate("photo")}{" "}
                    {errors.photo && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.photo.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='photo'
                    name='photo'
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
                  <Label for='startdate' className='form-label'>
                    {translate("startdate")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.startdate && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.startdate.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='startdate'
                    name='startdate'
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
                  <Label for='enddate' className='form-label'>
                    {translate("enddate")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.enddate && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.enddate.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='enddate'
                    name='enddate'
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
                  <Label for='periority' className='form-label'>
                    {translate("periority")}{" "}
                    {errors.periority && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.periority.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='periority'
                    name='periority'
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
            </Row>
          </Col>
          <Col lg='6' className='d-none d-lg-block'>
            <img src={picture} className='w-100' style={{ height: 400 }} />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>{translate("Next")}</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
  )
}
