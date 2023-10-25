import { Card, CardBody, CardText } from "reactstrap"
import { useTranslation } from "react-i18next"

export default function ProfileAbout({ data }) {
  const { t: translate } = useTranslation("common")

  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>{translate("About Us")}</h5>
        <CardText style={{ textAlign: "justify" }}>{data.aboutUs}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>{translate("Address")}</h5>
          <CardText>{data.address}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>{translate("Email")}</h5>
          <CardText className='text-start' dir='ltr'>
            {data.smeEmail}
          </CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>{translate("Website")}</h5>
          <CardText className='text-start' dir='ltr'>
            {data.smeWebsite}
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}
