import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardBody, Input, Button, Label } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useSelector } from "react-redux"
import { Star } from "react-feather"
import classnames from "classnames"
import Slider from "@material-ui/core/Slider"

export default function Sidebar() {
  const { t: translate } = useTranslation("shop")
  const products = useSelector((state) => state.shop.products)

  const categories = [
    {
      id: "category1",
      title: "تولید کنندگان",
      count: 1
    },
    {
      id: "category2",
      title: "محصولات",
      count: 1
    },
    {
      id: "category3",
      title: "خدمات دهندگان",
      count: 1
    },
    {
      id: "category4",
      title: "خدمات",
      count: 1
    },
    {
      id: "category5",
      title: "اخبار",
      count: 1
    },
    {
      id: "category6",
      title: "Category6",
      count: 1
    },
    {
      id: "category7",
      title: "Category7",
      count: 1
    },
    {
      id: "category8",
      title: "Category8",
      count: 1
    }
  ]

  const brands = [
    {
      id: "brand1",
      title: "Brand1",
      total: 1
    },
    {
      id: "brand2",
      title: "Brand2",
      total: 1,
      checked: true
    },
    {
      id: "brand3",
      title: "Brand3",
      total: 1
    },
    {
      id: "brand4",
      title: "Brand4",
      total: 1
    },
    {
      id: "brand5",
      title: "Brand5",
      total: 1,
      checked: true
    },
    {
      id: "brand6",
      title: "Brand6",
      total: 1
    },
    {
      id: "brand7",
      title: "Brand7",
      total: 1
    },
    {
      id: "brand8",
      title: "Brand8",
      total: 1,
      checked: true
    }
  ]

  const pricesList = products.map((item) => item.price)
  const minPrice = Math.min(...pricesList)
  const maxPrice = Math.max(...pricesList)
  const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice])

  const ratings = [
    {
      value: 4,
      total: 1
    },
    {
      value: 3,
      total: 1
    },
    {
      value: 2,
      total: 1
    },
    {
      value: 1,
      total: 1
    }
  ]

  const handlePriceRangeChange = (newValue) => {
    setPriceRangeValue(newValue)
  }

  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div className='sidebar-shop'>
          <Card>
            <CardBody style={{ height: 835 }}>
              <div className='categories'>
                <h6 className='filter-title mt-0'>{translate("Category")}</h6>
                <PerfectScrollbar
                  options={{ wheelPropagation: false }}
                  ref={(ref) => {
                    if (ref) {
                      ref.updateScroll()
                    }
                  }}
                >
                  <ul className='list-unstyled categories-list'>
                    {categories.map((category, index) => (
                      <li key={category.id}>
                        <div className='form-check'>
                          <Input type='checkbox' id={category.id} />
                          <Label for={category.id} className='form-check-label w-100'>
                            <div className='d-flex justify-content-between'>
                              <span>{`${translate("Category")}${++index}`}</span>
                              <span className='me-1'>{category.count}</span>
                            </div>
                          </Label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PerfectScrollbar>
              </div>
              <div className='brands'>
                <h6 className='filter-title'>{translate("Brand")}</h6>
                <PerfectScrollbar
                  options={{ wheelPropagation: false }}
                  ref={(ref) => {
                    if (ref) {
                      ref.updateScroll()
                    }
                  }}
                >
                  <ul className='list-unstyled brand-list'>
                    {brands.map((brand, index) => (
                      <li key={brand.id}>
                        <div className='form-check w-100'>
                          <Input type='checkbox' id={brand.title} defaultChecked={brand.checked} />
                          <Label for={brand.title} className='form-check-label w-100'>
                            <div className='d-flex justify-content-between'>
                              <span>{`${translate("Brand")}${++index}`}</span>
                              <span className='me-1'>{brand.total}</span>
                            </div>
                          </Label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PerfectScrollbar>
              </div>
              <div className='price-slider'>
                <h6 className='filter-title'>{translate("Price Range")}</h6>
                <div className='px-1'>
                  <Slider
                    className='range-slider text-primary m-0'
                    defaultValue={priceRangeValue}
                    value={priceRangeValue}
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    onChange={(event, value) => handlePriceRangeChange(value)}
                    marks={[
                      {
                        value: minPrice,
                        label: minPrice
                      },
                      {
                        value: maxPrice,
                        label: maxPrice
                      }
                    ]}
                    valueLabelDisplay='auto'
                  />
                </div>
              </div>
              <div className='ratings'>
                <h6 className='filter-title'>{translate("Rating")}</h6>
                <ul className='list-unstyled'>
                  {ratings.map((rating) => (
                    <li key={`rating${rating.value}`}>
                      <div className='form-check'>
                        <Input type='radio' id={rating.id} name='rating-radio' />
                        <Label for={rating.id} className='form-check-label w-100'>
                          <div className='ratings-list mb-1'>
                            <ul className='unstyled-list list-inline'>
                              {new Array(5).fill().map((listItem, index) => {
                                return (
                                  <li key={Math.random() * 100} className='ratings-list-item me-25'>
                                    <Star
                                      className={classnames({
                                        "filled-star": index + 1 <= rating.value,
                                        "unfilled-star": index + 1 > rating.value
                                      })}
                                    />
                                  </li>
                                )
                              })}
                              <li>{translate("& up")}</li>
                            </ul>
                            <div className='stars-received me-1'>{rating.total}</div>
                          </div>
                        </Label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='clear-filters mt-5'>
                <Button color='primary' block>
                  {translate("Clear All Filters")}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
