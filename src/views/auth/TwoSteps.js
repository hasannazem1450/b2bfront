import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Card, CardBody, CardText, Button, Form, Input } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { decrypt } from "encrypt-with-password"

import { handleLogin } from "@store/authentication"
import AuthIntlDropdown from "./components/AuthIntlDropdown"
import themeConfig from "@configs/themeConfig"
import { signUp, signIn } from "@api/auth"
import "@styles/react/pages/page-authentication.scss"

const TwoStepsBasic = () => {
  const codeLength = 6
  const [inputCode, setInputCode] = useState(new Array(codeLength).fill(""))
  const { t: translate } = useTranslation("auth")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleInputFocus = (e) => {
    const { value, maxLength, name } = e.target
    const currentIndex = parseInt(name.split("-")[1], 10)

    // prettier-ignore
    setInputCode((prevState) => prevState.map((prevStateValue, index) => {
        if (index === currentIndex - 1) {
          return value
        }

        return prevStateValue
      })
    )

    if (value.length <= maxLength) {
      if (currentIndex < codeLength) {
        const nextSibling = document.querySelector(`input[name=tsvc-${currentIndex + 1}]`)
        if (nextSibling) {
          nextSibling.focus()
        }
      }
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const userName = decrypt(searchParams.get("userName"), "b2b")
    const phoneNumber = `+98${decrypt(searchParams.get("phoneNumber"), "b2b").slice(1)}`
    const password = decrypt(searchParams.get("password"), "b2b")

    try {
      const response1 = await signUp({
        userName,
        phoneNumber,
        password
      })

      if (!response1.data.hasError) {
        const response2 = await signIn({
          userName,
          password,
          isPersistent: false
        })

        console.log(response2)

        if (!response2.data.hasError) {
          dispatch(
            handleLogin({
              token: response2.data.result.token,
              refreshToken: response2.data.result.refreshToken,
              role: "admin"
            })
          )

          navigate("/wizard", { replace: true })
        }
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
            <Form className='mt-2' onSubmit={handleFormSubmit}>
              <CardText className='text-center mb-2'>{translate("Type your 6 digit security code")}</CardText>
              <div
                className='auth-input-wrapper d-flex align-items-center justify-content-between'
                style={{ direction: "ltr" }}
              >
                <Input
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                  name='tsvc-1'
                  maxLength='1'
                  autoFocus
                  onChange={handleInputFocus}
                />
                <Input
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                  name='tsvc-2'
                  onChange={handleInputFocus}
                  maxLength='1'
                />
                <Input
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                  name='tsvc-3'
                  maxLength='1'
                  onChange={handleInputFocus}
                />
                <Input
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                  name='tsvc-4'
                  maxLength='1'
                  onChange={handleInputFocus}
                />
                <Input
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                  name='tsvc-5'
                  maxLength='1'
                  onChange={handleInputFocus}
                />
                <Input
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                  name='tsvc-6'
                  maxLength='1'
                  onChange={handleInputFocus}
                />
              </div>
              <Button block type='submit' color='primary' disabled={inputCode.join("").trim().length < codeLength}>
                {translate("Sign in")}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span>{translate("Didn’t get the code?")} </span>{" "}
              <a href='/' onClick={(e) => e.preventDefault()}>
                {translate("Resend")}
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TwoStepsBasic
