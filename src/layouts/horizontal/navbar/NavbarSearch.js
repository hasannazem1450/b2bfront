// ** React Imports
import { useState, useEffect } from "react"

// ** Third Party Components
// import axios from "axios"
import classnames from "classnames"
import * as Icon from "react-feather"
import { useTranslation } from "react-i18next"

// ** Store & Actions
import { useDispatch } from "react-redux"
import { handleSearchQuery } from "@store/navbar"

// ** Custom Components
import Autocomplete from "./autocomplete"

const NavbarSearch = () => {
  const { t: translate } = useTranslation(["common"])
  // ** Store Vars
  const dispatch = useDispatch()

  // ** States
  const [suggestions, setSuggestions] = useState([])

  // ** ComponentDidMount
  useEffect(() => {
    setSuggestions([
      {
        groupTitle: translate("Categories"),
        searchLimit: 4,
        data: [
          {
            id: 1,
            title: "Category 1",
            link: "/category/1"
          },
          {
            id: 2,
            title: "Category 2",
            link: "/category/2"
          },
          {
            id: 3,
            title: "Category 3",
            link: "/category/3"
          },
          {
            id: 4,
            title: "Category 4",
            link: "/category/4"
          }
        ]
      },
      {
        groupTitle: translate("Brands"),
        searchLimit: 4,
        data: [
          {
            id: 1,
            title: "Brand 1",
            link: "/brand/1"
          },
          {
            id: 2,
            title: "Brand 2",
            link: "/brand/2"
          },
          {
            id: 3,
            title: "Brand 3",
            link: "/brand/3"
          },
          {
            id: 4,
            title: "Brand 4",
            link: "/brand/4"
          }
        ]
      },
      {
        groupTitle: translate("Products"),
        searchLimit: 4,
        data: [
          {
            id: 1,
            title: "Product 1",
            link: "/Product/1"
          },
          {
            id: 2,
            title: "Product 2",
            link: "/Product/2"
          },
          {
            id: 3,
            title: "Product 3",
            link: "/Product/3"
          },
          {
            id: 4,
            title: "Product 4",
            link: "/Product/4"
          }
        ]
      }
    ])
  }, [])

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(""))

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    handleClearQueryInStore()
  }

  // ** Function to clear input value
  // const handleClearInput = (setUserInput) => {
  //   setUserInput("")
  //   handleClearQueryInStore()
  // }

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e)
    handleClearQueryInStore()
  }

  return (
    <div className='nav-search flex-grow-1 mx-1'>
      <Autocomplete
        className='form-control'
        suggestions={suggestions}
        filterKey='title'
        filterHeaderKey='groupTitle'
        grouped={true}
        placeholder={translate("Search...")}
        autoFocus={false}
        onSuggestionItemClick={handleSuggestionItemClick}
        externalClick={handleExternalClick}
        // clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
        onKeyDown={onKeyDown}
        onChange={(e) => dispatch(handleSearchQuery(e.target.value))}
        customRender={(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
          const IconTag = Icon[item.icon ? item.icon : "X"]
          return (
            <li
              className={classnames("suggestion-item", {
                active: filteredData.indexOf(item) === activeSuggestion
              })}
              key={i}
              onClick={(e) => handleListItemClick(onSuggestionItemClick, item.link, e)}
              onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
            >
              <div
                className={classnames({
                  "d-flex justify-content-between align-items-center": item.file || item.img
                })}
              >
                <div className='item-container d-flex'>
                  {item.icon ? (
                    <IconTag size={17} />
                  ) : item.file ? (
                    <img src={item.file} height='36' width='28' alt={item.title} />
                  ) : item.img ? (
                    <img className='rounded-circle mt-25' src={item.img} height='28' width='28' alt={item.title} />
                  ) : null}
                  <div className='item-info ms-1'>
                    <p className='align-middle mb-0'>{item.title}</p>
                    {item.by || item.email ? (
                      <small className='text-muted'>{item.by ? item.by : item.email ? item.email : null}</small>
                    ) : null}
                  </div>
                </div>
                {item.size || item.date ? (
                  <div className='meta-container'>
                    <small className='text-muted'>{item.size ? item.size : item.date ? item.date : null}</small>
                  </div>
                ) : null}
              </div>
            </li>
          )
        }}
      />
    </div>
  )
}

export default NavbarSearch
