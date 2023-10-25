import { Link, useNavigate, createSearchParams } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, Form, Label, FormFeedback, Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Cleave from "cleave.js/react"
import "cleave.js/dist/addons/cleave-phone.ir"
import { encrypt } from "encrypt-with-password"
import AuthIntlDropdown from "./components/AuthIntlDropdown"
import InputPasswordToggle from "@components/input-password-toggle"
import themeConfig from "@configs/themeConfig"
import "@styles/react/pages/page-authentication.scss"

export default function Register() {
  const { t: translate } = useTranslation("auth")
  const navigate = useNavigate()

  const schema = yup.object({
    nationalID: yup.string().required("(الزامی)").length(10, "(صحیح نمی باشد)"),
    mobile: yup
      .string()
      .required("(الزامی)")
      .length(11, "(صحیح نمی باشد)")
      .test("iranMobileFormat", "(صحیح نمی باشد)", (value) => {
        return value.startsWith("09")
      }),
    password: yup
      .string()
      .required("(الزامی)")
      .min(6, "(حداقل 6 کاراکتر)")
      .max(50, "(حداکثر 50 کاراکتر)")
      .matches(/^(?=.*[A-Za-z])(?=.*[0-9])/, "باید تلفیقی از حروف انگلیسی و اعداد باشد"),
    confirmPassword: yup
      .string()
      .required("(الزامی)")
      .oneOf([yup.ref("password"), null], "(صحیح نمی باشد)")
  })

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      nationalID: "",
      mobile: "",
      password: "",
      confirmPassword: ""
    },
    mode: "all",
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    navigate({
      pathname: "/two-steps-verification",
      search: createSearchParams({
        userName: encrypt(data.nationalID, "b2b"),
        phoneNumber: encrypt(data.mobile, "b2b"),
        password: encrypt(data.password, "b2b")
      }).toString()
    })
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <AuthIntlDropdown />
            <Link className='brand-logo' to='/' onClick={(e) => e.preventDefault()}>
              <img src={themeConfig.app.appLogoImage} style={{ width: 50 }} alt={themeConfig.app.appName} />
            </Link>
            <CardTitle tag='h4' className='text-center mb-1'>
              {translate("Registration form")}
            </CardTitle>
            <CardText className='text-center mb-2'>{translate("Please fill in the information below")}</CardText>
            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label for='nationalID'>
                  {translate("National ID")}
                  <span className='text-danger'>*</span>{" "}
                  {errors.nationalID && (
                    <FormFeedback tag='span' className='d-inline'>
                      {errors.nationalID.message}
                    </FormFeedback>
                  )}
                </Label>
                <Controller
                  name='nationalID'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Cleave
                      id='nationalID'
                      className={`form-control text-start rounded-0${
                        fieldState.error !== undefined ? " is-invalid" : ""
                      }`}
                      {...field}
                      dir='ltr'
                      options={{
                        numericOnly: true,
                        blocks: [10]
                      }}
                      onChange={(e) => setValue("nationalID", e.target.rawValue)}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label for='mobile'>
                  {translate("Mobile")}
                  <span className='text-danger'>*</span>{" "}
                  {errors.mobile && (
                    <FormFeedback tag='span' className='d-inline'>
                      {errors.mobile.message}
                    </FormFeedback>
                  )}
                </Label>
                <Controller
                  name='mobile'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Cleave
                      id='mobile'
                      className={`form-control text-start rounded-0 ${
                        fieldState.error !== undefined ? "is-invalid" : ""
                      }`}
                      {...field}
                      dir='ltr'
                      options={{
                        numericOnly: true,
                        phone: true,
                        phoneRegionCode: "IR",
                        blocks: [4, 3, 4]
                      }}
                      onChange={(e) => setValue("mobile", e.target.rawValue)}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label for='password'>
                  {translate("Password")}
                  <span className='text-danger'>*</span>{" "}
                  {errors.password && (
                    <FormFeedback tag='span' className='d-inline'>
                      {errors.password.message}
                    </FormFeedback>
                  )}
                </Label>
                <Controller
                  name='password'
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputPasswordToggle
                      id='password'
                      invalid={fieldState.error !== undefined}
                      {...field}
                      placeholder=' '
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label for='confirmPassword'>
                  {translate("Confirm password")}
                  <span className='text-danger'>*</span>{" "}
                  {errors.confirmPassword && (
                    <FormFeedback tag='span' className='d-inline'>
                      {errors.confirmPassword.message}
                    </FormFeedback>
                  )}
                </Label>
                <Controller
                  name='confirmPassword'
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputPasswordToggle
                      id='confirmPassword'
                      invalid={fieldState.error !== undefined}
                      {...field}
                      placeholder=' '
                    />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block disabled={!isValid}>
                {translate("Sign up")}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>{translate("Already have an account?")}</span>
              <Link to='/login'>
                <span>{translate("Sign in instead")} </span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
