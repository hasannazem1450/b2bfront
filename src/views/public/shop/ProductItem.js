import { Link } from "react-router-dom"
import { Card, CardBody, CardText, Button, Badge } from "reactstrap"
import { Star } from "react-feather"
import classnames from "classnames"
import { useTranslation } from "react-i18next"

export default function ProductItem({ item }) {
  const { t: translate, i18n } = useTranslation(["shop", "products"])

  const currencySign = i18n.language === "ir" ? "ريال" : "$"

  return (
    <Card className='ecommerce-card' key={item.name}>
      <div className='item-img text-center mx-auto'>
        <Link to={`product-detail/${item.slug}`} onClick={(e) => e.preventDefault()}>
          <img className='img-fluid card-img-top' src={item.image} alt={item.name} />
        </Link>
      </div>
      <CardBody>
        <div className='item-wrapper'>
          <div className='item-rating'>
            <ul className='unstyled-list list-inline'>
              {new Array(5).fill().map((listItem, index) => {
                return (
                  <li key={index} className='ratings-list-item me-25'>
                    <Star
                      className={classnames({
                        "filled-star": index + 1 <= item.rating,
                        "unfilled-star": index + 1 > item.rating
                      })}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='item-cost'>
            {/* prettier-ignore */}
            <h6 className='item-price'>
              {i18n.language === "ir" ? `${item.price.toFixed(0) * 30000} ${currencySign}` : `${currencySign} ${item.price}`}
            </h6>
          </div>
        </div>
        <CardText tag='span' className='item-name'>
          <Link className='text-body' to={`product-detail/${item.slug}`} onClick={(e) => e.preventDefault()}>
            {translate(`${item.id}.name`, { ns: "products" })}
          </Link>
        </CardText>
        <CardText tag='span' className='item-brand'>
          <Link className='text-body' to='/profile'>
            {translate(`${item.id}.brand`, { ns: "products" })}
          </Link>
        </CardText>
        <CardText className='item-description'>{translate(`${item.id}.description`, { ns: "products" })}</CardText>
      </CardBody>
      <div className='item-options text-center'>
        <div className='item-wrapper'>
          <div className='item-cost'>
            {/* prettier-ignore */}
            <h4 className='item-price'>
              {i18n.language === "ir" ? `${item.price.toFixed(0) * 30000} ${currencySign}` : `${currencySign} ${item.price}`}
            </h4>
          </div>
        </div>
        <Button
          tag='a'
          href={`product-detail/${item.slug}`}
          color='primary'
          className='btn-cart move-cart'
          onClick={(e) => e.preventDefault()}
        >
          <span>{translate("more info", { ns: "shop" })}</span>
        </Button>
      </div>
    </Card>
  )
}
