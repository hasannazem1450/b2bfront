import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText } from "reactstrap"
import { formatDistanceToNow } from "date-fns"
import { enUS, faIR } from "date-fns/locale"
import { TrendingUp, User, Box, DollarSign } from "react-feather"
import { useTranslation } from "react-i18next"
import classnames from "classnames"
import { useRTL } from "@hooks/useRTL"
import Avatar from "@components/avatar"

export default function StatsCard({ cols }) {
  const [isRtl] = useRTL()
  const { t: translate } = useTranslation("dashboard")

  const currencySign = isRtl ? "ريال" : "$"

  // prettier-ignore
  const lastUpdate = formatDistanceToNow(new Date().getTime() - (5 * 60 * 1000), {
    addSuffix: true,
    locale: isRtl ? faIR : enUS
  })

  const data = [
    {
      title: `${Intl.NumberFormat().format(8549)}`,
      subtitle: translate("Customers"),
      color: "light-info",
      icon: <User size={26} />
    },
    {
      title: `${Intl.NumberFormat().format(14230)}`,
      subtitle: translate("Products"),
      color: "light-danger",
      icon: <Box size={26} />
    },
    {
      title: Intl.NumberFormat().format(23634),
      subtitle: translate("Sales"),
      color: "light-primary",
      icon: <TrendingUp size={26} />
    },
    {
      // prettier-ignore
      title: isRtl ? `${Intl.NumberFormat().format(9745 * 30000)} ${currencySign}` : `${currencySign}${Intl.NumberFormat().format(9745)}`,
      subtitle: translate("Revenue"),
      color: "light-success",
      icon: <DollarSign size={26} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? "sm" : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-end'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-medium-1 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader className='justify-content-start'>
        <CardTitle tag='h4'>{translate("Statistics")}</CardTitle>
        {/* prettier-ignore */}
        <CardText tag='span' className='card-text font-small-3 ms-1'>{`(${translate("Updated")}: ${lastUpdate})`}</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}
