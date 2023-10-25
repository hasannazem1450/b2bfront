import { useContext } from "react"
import { Row, Col } from "reactstrap"
import { ThemeColors } from "@src/utility/context/ThemeColors"
import StatsCard from "./components/StatsCard"
import RevenueReport from "./components/RevenueReport"

export default function Dashboard() {
  const { colors } = useContext(ThemeColors)

  return (
    <>
      <Row className='match-height'>
        <Col xs='12'>
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
    </>
  )
}
