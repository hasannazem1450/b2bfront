import { useSelector } from "react-redux"
import classnames from "classnames"
import ProductItem from "./ProductItem"

export default function ProductList({ activeView, count }) {
  const store = useSelector((state) => state.shop)
  const renderProducts = store.products
    .slice(0, count || store.products.length)
    .map((item) => <ProductItem key={item.id} item={item} />)

  return (
    <div
      className={classnames("mt-1", {
        "grid-view": activeView === "grid",
        "list-view": activeView === "list"
      })}
    >
      {renderProducts}
    </div>
  )
}
