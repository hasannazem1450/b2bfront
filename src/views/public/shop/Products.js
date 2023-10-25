import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import ProductList from "./ProductList"

const ProductsPage = ({ activeView }) => {
  const { t: translate } = useTranslation("shop")
  const store = useSelector((state) => state.shop)

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        {store.products.length ? (
          <Fragment>
            <ProductList activeView={activeView} />
          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>{translate("No Result")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
