// import { useContext } from "react"
import { Row, Col } from "reactstrap"
import { useTranslation } from "react-i18next"
// import { ThemeColors } from "@src/utility/context/ThemeColors"

export default function Users() {
  const { t: translate } = useTranslation()
  //   const { colors } = useContext(ThemeColors)

  return (
    <>
      <Row className='match-height'>
        <Col xs='12'>
          <h3>{translate("Users")}</h3>
        </Col>
      </Row>
    </>
  )
}
