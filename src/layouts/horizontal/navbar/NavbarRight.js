import { NavItem, NavLink } from "reactstrap"
import { Link } from "react-router-dom"
import { Menu } from "react-feather"
import themeConfig from "@configs/themeConfig"

export default function NavbarRight(props) {
  const { menuCollapsed, toggleHorizontalMenuSidebar } = props

  return (
    <div className='d-flex'>
      <div className='d-flex align-items-center'>
        <ul className='navbar-nav d-xl-none'>
          <NavItem className='mobile-menu me-auto'>
            <NavLink
              className='nav-menu-main menu-toggle hidden-xs is-active'
              onClick={() => toggleHorizontalMenuSidebar(!menuCollapsed)}
            >
              <Menu className='ficon' />
            </NavLink>
          </NavItem>
        </ul>
      </div>
      <div className='d-none d-sm-flex align-items-center'>
        {themeConfig.app.appLogoImage && (
          <Link to='/'>
            <img src={themeConfig.app.appLogoImage} style={{ width: 30 }} alt={themeConfig.app.appName} />
          </Link>
        )}
        {themeConfig.app.appName && (
          <Link to='/'>
            <h1 className='text-body font-medium-2 fw-bolder mb-0 ms-50'>{themeConfig.app.appName}</h1>
          </Link>
        )}
      </div>
    </div>
  )
}
