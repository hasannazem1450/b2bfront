import { Fragment } from "react"
import { NavItem, NavLink } from "reactstrap"
import { Sun, Moon, Menu } from "react-feather"
import NavbarSearch from "./NavbarSearch"
import NavbarUser from "./NavbarUser"

export default function CustomNavbar(props) {
  const { skin, setSkin, setMenuVisibility } = props

  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className='ficon' onClick={() => setSkin("semi-dark")} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin("dark")} />
    }
  }

  return (
    <Fragment>
      <div className='d-flex align-items-center'>
        <ul className='navbar-nav d-xl-none'>
          <NavItem className='mobile-menu me-auto'>
            <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
              <Menu className='ficon' />
            </NavLink>
          </NavItem>
        </ul>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
        <ul className='navbar-nav'>
          <NavbarSearch />
        </ul>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}
