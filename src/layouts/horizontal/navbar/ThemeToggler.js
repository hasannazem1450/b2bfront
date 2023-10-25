import { NavItem, NavLink } from "reactstrap"
import { Sun, Moon } from "react-feather"

export default function ThemeToggler(props) {
  const { className, skin, setSkin } = props

  return (
    <NavItem className={className}>
      <NavLink>
        {skin === "dark" ? (
          <Sun className='ficon' onClick={() => setSkin("semi-dark")} />
        ) : (
          <Moon className='ficon' onClick={() => setSkin("dark")} />
        )}
      </NavLink>
    </NavItem>
  )
}
