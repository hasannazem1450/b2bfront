import { useState, useEffect } from "react"

import HorizontalNavMenuItems from "./HorizontalNavMenuItems"
import HorizontalNavMenuItemsSidebar from "./HorizontalNavMenuItemsSidebar"
import ThemeToggler from "../navbar/ThemeToggler"
import IntlDropdown from "../navbar/IntlDropdown"

export default function CustomMenu({ skin, setSkin, menuData }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth)
    }
  }, [windowWidth])

  if (windowWidth < 1200) {
    return (
      <>
        <div className='navbar-header d-flex justify-content-center'>
          <ul className='nav align-items-end'>
            <ThemeToggler skin={skin} setSkin={setSkin} />
            <IntlDropdown />
          </ul>
        </div>
        <div className='shadow-bottom'></div>
        <div className='navbar-container main-menu-content'>
          <ul id='main-menu-navigation' className='navigation navigation-main'>
            <HorizontalNavMenuItemsSidebar submenu={true} items={menuData} />
          </ul>
        </div>
      </>
    )
  } else if (windowWidth >= 768) {
    return (
      <div className='navbar-container main-menu-content'>
        <ul id='main-menu-navigation' className='nav navbar-nav'>
          <HorizontalNavMenuItems submenu={false} items={menuData} />
        </ul>
      </div>
    )
  }
}
