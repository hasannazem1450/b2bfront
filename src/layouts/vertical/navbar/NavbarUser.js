import IntlDropdown from "./IntlDropdown"
import UserDropdown from "./UserDropdown"

export default function NavbarUser() {
  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      <IntlDropdown />
      <UserDropdown />
    </ul>
  )
}
