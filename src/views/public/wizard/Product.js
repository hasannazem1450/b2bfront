import { Fragment, useState, useEffect } from "react"

import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight } from "react-feather"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { isObjEmpty } from "@utils"
import picture from "@src/assets/images/banner/id.png"

import { useSelector } from "react-redux"

export default function MemberInformation({ stepper }) {
  const store = useSelector((state) => state.wizardStore) 
  console.log(store)


  const { t: translate } = useTranslation("wizard")
  //handleNews()
  const MemberSchema = yup.object().shape({
    memberName: yup.string().required("(اجباری)").max(50, "(حداکثر 100 کاراکتر)")
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "all",
    resolver: yupResolver(MemberSchema)
  })
  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      stepper.storedData = { ...stepper.storedData, ...data }
      stepper.next()
    }
  }
  const goPrev = (e) => {
    e.preventDefault()
    stepper.previous()
  }

  
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='content-header'>
          <h5 className='mb-0'>{translate("product")}</h5>
          <small className='text-muted'>{translate("newInformationFormTitle")}</small>
        </div>
        <Row className='mb-1' style={{ minHeight: 550 }}>
          <Col lg='6'>
            <Row>
              <Col md='6'>
                <Col className='mb-1'>
                  <Label for='memberName' className='form-label'>
                    {translate("Member Name")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.memberName && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.memberName.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Controller
                    id='memberName'
                    name='memberName'
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
