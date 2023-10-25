import NavbarAuth from "./NavbarAuth"
import ThemeToggler from "./ThemeToggler"
import IntlDropdown from "./IntlDropdown"
import UserDropdown from "./UserDropdown"
import { getUserData } from "@utils"

export default function NavbarLeft(props) {
  const { skin, setSkin } = props
  const user = getUserData()

  return (
    <div className='d-flex'>
      <ul className='nav navbar-nav align-items-center ms-auto'>
        {user ? (
          <>
            <ThemeToggler className='d-none d-lg-block' skin={skin} setSkin={setSkin} />
            <IntlDropdown className='d-none d-lg-block' />
            <UserDropdown />
          </>
        ) : (
          <>
            <NavbarAuth />
            <ThemeToggler className='d-none d-lg-block' skin={skin} setSkin={setSkin} />
            <IntlDropdown className='d-none d-lg-block' />
          </>
        )}
      </ul>
    </div>
  )
}
