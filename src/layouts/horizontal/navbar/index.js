import { useSelector, useDispatch } from "react-redux"
import { handleMenuCollapsed } from "@store/layout"

import NavbarSearch from "./NavbarSearch"
import NavbarRight from "./NavbarRight"
import NavbarLeft from "./NavbarLeft"

const ThemeNavbar = (props) => {
  const { skin, setSkin } = props
  const dispatch = useDispatch()

  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  const toggleHorizontalMenuSidebar = (value) => {
    dispatch(handleMenuCollapsed(value))
  }

  return (
    <div className='w-100 d-flex justify-content-between'>
      <NavbarRight menuCollapsed={menuCollapsed} toggleHorizontalMenuSidebar={toggleHorizontalMenuSidebar} />
      <NavbarSearch />
      <NavbarLeft skin={skin} setSkin={setSkin} />
    </div>
  )
}

export default ThemeNavbar
