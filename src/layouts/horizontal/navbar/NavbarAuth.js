import { NavItem, NavLink, Button } from "reactstrap"
import { useTranslation } from "react-i18next"

export default function NavbarAuth() {
  const { t: translate } = useTranslation("auth")

  return (
    <NavItem>
      <NavLink href='/login'>
        <Button color='primary' outline>
          {translate("Sign in")}
        </Button>
      </NavLink>
    </NavItem>
  )
}
