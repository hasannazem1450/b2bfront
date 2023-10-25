import { Card, CardBody } from "reactstrap"
import { useTranslation } from "react-i18next"
import ProductList from "../shop/ProductList"

export default function ProfileProducts({ activeView }) {
  const { t: translate } = useTranslation("common")

  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>{translate("Products")}</h5>
        <div className='ecommerce-application'>
          <ProductList activeView={activeView} count={4} />
        </div>
      </CardBody>
    </Card>
  )
}
