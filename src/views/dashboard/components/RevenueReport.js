import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from "reactstrap"
import { useTranslation } from "react-i18next"
import Chart from "react-apexcharts"
import { useRTL } from "@hooks/useRTL"

const RevenueReport = (props) => {
  const [isRtl] = useRTL()
  const { t: translate } = useTranslation("dashboard")

  const currencySign = isRtl ? "ريال" : "$"

  const data = {
    years: isRtl ? ["1401", "1400", "1399"] : ["2021", "2020", "2019"],
    budget: isRtl ? Intl.NumberFormat().format(25852 * 30000) : Intl.NumberFormat().format(25852)
  }

  const revenueOptions = {
    chart: {
      stacked: true,
      type: "bar",
      toolbar: { show: false }
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10
      },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      // prettier-ignore
      categories: isRtl ? ["مرداد", "تیر", "خرداد", "اردیبهشت", "فروردین", "اسفند", "بهمن", "دی", "آذر"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.86rem"
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [props.primary, props.warning],
    plotOptions: {
      bar: {
        columnWidth: "17%",
        borderRadius: [5]
      },
      distributed: true
    },
    yaxis: {
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.86rem"
        }
      }
    }
  }
  const revenueSeries = [
    {
      name: translate("Earning"),
      data: [95, 177, 284, 256, 105, 63, 168, 218, 72]
    },
    {
      name: translate("Expense"),
      data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
    }
  ]

  const budgetSeries = [
    {
      data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62, 41]
    }
  ]
  const budgetOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      type: "line",
      sparkline: { enabled: true }
    },
    stroke: {
      curve: "smooth",
      dashArray: [0, 5],
      width: [2]
    },
    colors: [props.primary, "#dcdae3"],
    tooltip: {
      enabled: false
    }
  }

  return (
    <Card className='card-revenue-budget'>
      <CardHeader className='justify-content-start'>
        <CardTitle tag='h4'>{translate("Revenue Report")}</CardTitle>
        <div className='d-flex align-items-center ms-2'>
          <div className='d-flex align-items-center me-2'>
            <span className='bullet bullet-primary me-50 cursor-pointer'></span>
            <span>{translate("Earning")}</span>
          </div>
          <div className='d-flex align-items-center'>
            <span className='bullet bullet-warning me-50 cursor-pointer'></span>
            <span>{translate("Expense")}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          <Col className='revenue-report-wrapper' md='8' xs='12'>
            <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={revenueSeries} />
          </Col>
          <Col className='budget-wrapper' md='4' xs='12'>
            <UncontrolledButtonDropdown>
              <DropdownToggle className='budget-dropdown' outline color='primary' size='sm' caret>
                {data.years[0]}
              </DropdownToggle>
              <DropdownMenu>
                {data.years.map((item) => (
                  <DropdownItem className='w-100' key={item}>
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <h2 className='mb-25'>{isRtl ? `${data.budget} ${currencySign}` : `${currencySign}${data.budget}`}</h2>
            <Chart id='budget-chart' type='line' height='80' options={budgetOptions} series={budgetSeries} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default RevenueReport
