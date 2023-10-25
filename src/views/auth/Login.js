import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  InputGroup,
  FormFeedback,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Cleave from "cleave.js/react"
import "cleave.js/dist/addons/cleave-phone.ir"
import { useDispatch } from "react-redux"
import { handleLogin } from "@store/authentication"
import InputPasswordToggle from "@components/input-password-toggle"
import AuthIntlDropdown from "./components/AuthIntlDropdown"
import themeConfig from "@configs/themeConfig"
import { signIn } from "@api/auth"
import "@styles/react/pages/page-authentication.scss"

export default function Login() {
  const { t: translate } = useTranslation("auth")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginType, setLoginType] = useState("nationalID")

  const schema = yup.object({
    nationalID: loginType === "nationalID" && yup.string().required("(الزامی)").length(10, "(صحیح نمی باشد)"),
    mobile:
      loginType === "mobile" &&
      yup
        .string()
        .required("(الزامی)")
        .length(11, "(صحیح نمی باشد)")
        .test("iranMobileFormat", "(صحیح نمی باشد)", (value) => {
          return value.startsWith("09")
        }),
    password: yup
      .string()
      .required("(الزامی)")
      // .min(6, "(حداقل 6 کاراکتر)"),
      .max(50, "(حداکثر 50 کاراکتر)")
    // .matches(/^(?=.*[a-z])(?=.*[0-9])/, " "),
  })

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      nationalID: "",
      mobile: "",
      password: "",
      isPersistent: false
    },
    mode: "all",
    resolver: yupResolver(schema)
  })

  const handleLoginTypeChange = (value) => {
    if (loginType !== value) {
      reset()
      setLoginType(value)
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await signIn({
        userName: loginType === "nationalID" ? data.nationalID : loginType === "mobile" ? `+98${data.mobile.slice(1)}` : "",
        password: data.password,
        isPersistent: data.isPersistent
      })

      if (!response.data.hasError) {
        dispatch(
          handleLogin({
            token: response.data.result.token,
            refreshToken: response.data.result.refreshToken,
            role: "admin"
          })
        )

 navigate("/Public", { replace: true })
      }
    } catch (error) {
      console.log(error.message)
    }
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
              {translate("Welcome!")}
            </CardTitle>
            <CardText className='text-center mb-2'>{translate("Please sign-in to your account")}</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label for={loginType}>
                  {translate("Username")}
                  <span className='text-danger'>*</span>{" "}
                  {loginType === "nationalID" && errors.nationalID && (
                    <FormFeedback tag='span' className='d-inline'>
                      {errors.nationalID.message}
                    </FormFeedback>
                  )}
                  {loginType === "mobile" && errors.mobile && (
                    <FormFeedback tag='span' className='d-inline'>
                      {errors.mobile.message}
                    </FormFeedback>
                  )}
                </Label>
                <InputGroup>
                  <UncontrolledButtonDropdown>
                    {/* prettier-ignore */}
                    <DropdownToggle color='primary' className='btn-sm rounded-0 shadow-lg' style={{ width: 100 }} caret>
                      {loginType === "mobile" ? translate("Mobile") : loginType === "nationalID" ? translate("National ID") : '' }
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag='li' onClick={() => handleLoginTypeChange("nationalID")}>
                        {translate("National ID")}
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag='li' onClick={() => handleLoginTypeChange("mobile")}>
                        {translate("Mobile")}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {loginType === "nationalID" && (
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
                  )}
                  {loginType === "mobile" && (
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
                  )}
                </InputGroup>
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='password'>
                    {translate("Password")}
                    <span className='text-danger'>*</span>{" "}
                    {errors.password && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.password.message}
                      </FormFeedback>
                    )}
                  </Label>
                  <Link to='/forgot-password'>
                    <small>{translate("Forgot Password?")}</small>
                  </Link>
                </div>
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
              <div className='form-check mb-1'>
                <Controller
                  name='isPersistent'
                  control={control}
                  render={({ field }) => <Input type='checkbox' id='isPersistent' {...field} />}
                />
                <Label for='isPersistent' className='form-check-label'>
                  {translate("Remember Me")}
                </Label>
              </div>
              <Button type='submit' color='primary' block disabled={!isValid}>
                {translate("Sign in")}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>{translate("New on our platform?")} </span>
              <Link to='/register'>
                <span>{translate("Create an account")} </span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
