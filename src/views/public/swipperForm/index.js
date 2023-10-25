import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css"
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker"
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import UploadSwiper from "./UploadSwiper"

export default function index() {
  // ** utils
  const MySwal = withReactContent(Swal)

  // ** useState
  const [dateOfLetterIssue, setDateOfLetterIssue] = useState(null)
  const [dateOfLetterIssueError, setDateOfLetterIssueError] = useState(false)
  const [dateOfFixingEffect, setDateOfFixingEffect] = useState(null)

  // ** useDispatch
  const dispatch = useDispatch()

  // ** useEffect
  useEffect(() => {}, [])

  // ** defaultValuesHookForm
  const defaultValues = {}

  // **  validationForm
  const revocationSchema = yup.object().shape({})

  // ** configHookForm
  const {
    setValue,
    getValues,
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(revocationSchema),
    defaultValues
  })

  // ** handleConfirm
  const handleConfirm = (data) => {
    console.log(data)
  }

  // ** UI
  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(handleConfirm)}>
          <Row style={{ justifyContent: "space-around" }}>
            <Col md='6' className='' style={{ alignSelf: "center" }}>
              <Row>
                {/* name */}
                <Col md='6' sm='12' className='mb-2'>
                  <Label className='form-label' for='cardNumber'>
                    نام
                  </Label>
                  <Controller
                    id='cardNumber'
                    name='cardNumber'
                    control={control}
                    render={({ field }) => <Input {...field} lang='fa-IR' autoComplete='off' />}
                  />
                </Col>

                {/* periority */}
                <Col md='6' sm='12' className='mb-2'>
                  <Label className='form-label' for='letterNumber'>
                    اولویت
                  </Label>
                  <Controller
                    id='letterNumber'
                    name='letterNumber'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        lang='fa-IR'
                        type='number'
                        autoComplete='off'
                        invalid={errors.letterNumber && true}
                      />
                    )}
                  />
                  {errors.letterNumber && <FormFeedback>{errors.letterNumber.message}</FormFeedback>}
                </Col>
              </Row>

              <Row>
                {/* End date of the show */}
                <Col md='6' sm='12' className='mb-2'>
                  <Label className='form-label' for='dateOfFixingEffect'>
                    تاریخ پایان نمایش
                  </Label>
                  <div>
                    <DatePicker
                      value={dateOfFixingEffect}
                      onChange={setDateOfFixingEffect}
                      shouldHighlightWeekends
                      locale='fa'
                    />
                  </div>
                </Col>

                {/* start date of the show */}
                <Col md='6' sm='12' className='mb-2' style={{ zIndex: "201" }}>
                  <Label className='form-label' for='dateOfLetterIssue'>
                    تاریخ شروع نمایش
                  </Label>
                  <div>
                    <DatePicker
                      value={dateOfLetterIssue}
                      onChange={setDateOfLetterIssue}
                      shouldHighlightWeekends
                      locale='fa'
                    />
                  </div>
                  {dateOfLetterIssueError && (
                    <FormFeedback style={{ display: "block" }}>وارد کردن تاریخ صدور نامه الزامی است </FormFeedback>
                  )}
                </Col>
              </Row>
            </Col>

            {/* uploadFile */}
            <Col className='shadow-lg p-1 ' md='5'>
              <Label className='form-label mb-1 fw-bolder'>اپلود تصویر</Label>
              <UploadSwiper
                ext={"image/*"}
                size={1000000}
              />
            </Col>
          </Row>
          <Button color='primary'>ثبت</Button>
        </Form>
      </CardBody>
    </Card>
  )
}
