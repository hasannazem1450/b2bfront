import { Link } from "react-router-dom"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { User, Power } from "react-feather"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { handleLogout } from "@store/authentication"
import { signOut } from "@api/auth"
import Avatar from "@components/avatar"
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png"

export default function UserDropdown() {
  const { t: translate } = useTranslation(["common"])
  const dispatch = useDispatch()

  const handleApiLogout = async () => {
    try {
      // const response = await signOut()
      // console.log(response)
      dispatch(handleLogout())
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={(e) => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{translate("John Doe")}</span>
          <span className='user-status'>{translate("User")}</span>
        </div>
        <Avatar img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>{translate("Profile")}</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/' onClick={handleApiLogout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>{translate("Logout")}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
