import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, Form, Input, Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { ChevronLeft } from "react-feather"
import AuthIntlDropdown from "./components/AuthIntlDropdown"
import themeConfig from "@configs/themeConfig"
import "@styles/react/pages/page-authentication.scss"

export default function ForgotPassword() {
  const { t: translate } = useTranslation("auth")

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
              {translate("Forgot Password?")}
            </CardTitle>
            <CardText className='text-center mb-2'>
              {translate("Enter your email and we'll send you instructions to reset your password")}
            </CardText>
            <Form className='auth-forgot-password-form mt-2' onSubmit={(e) => e.preventDefault()}>
              <div className='mb-1'>
                <Input type='email' id='login-email' placeholder={translate("Email")} autoFocus />
              </div>
              <Button tag={Link} to='/' color='primary' block>
                {translate("Send reset link")}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>{translate("Back to login")}</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
