import { Card, CardBody } from "reactstrap"
import classnames from "classnames"
import { useTranslation } from "react-i18next"
import Avatar from "@components/avatar"

export default function ProfileMembers({ data }) {
  const { t: translate } = useTranslation("common")

  const renderMembers = () => {
    return data.map((member, index) => {
      return (
        <div className={classnames("d-flex justify-content-start align-items-center mt-2")} key={index}>
          <Avatar className='me-1' img={member.avatar} imgHeight={40} imgWidth={40} />
          <div className='profile-user-info'>
            <h6 className='mb-0'>{member.name}</h6>
            <small className='text-muted'>{member.position}</small>
          </div>
        </div>
      )
    })
  }

  return (
    <Card>
      <CardBody className='profile-members'>
        <h5 className='mb-75'>{translate("Members")}</h5>
        {renderMembers()}
      </CardBody>
    </Card>
  )
}
