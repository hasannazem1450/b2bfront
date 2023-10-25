import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { handleRTL } from "@store/layout"
import irFlag from "@src/assets/images/flags/ir.svg"
import usFlag from "@src/assets/images/flags/uk.svg"

export default function IntlDropdown() {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()

  // const langObj = {
  //   en: "English",
  //   ir: "فارسی"
  // }

  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    dispatch(handleRTL(lang === "ir"))
    i18n.changeLanguage(lang)
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={(e) => e.preventDefault()}>
        <img src={i18n.language === "en" ? usFlag : irFlag} className='country-flag flag-icon m-0' />
        {/* <span className='selected-language'>{langObj[i18n.language]}</span> */}
      </DropdownToggle>
      <DropdownMenu className='mt-0'>
        <DropdownItem href='/' tag='a' onClick={(e) => handleLangUpdate(e, "ir")}>
          <img src={irFlag} className='country-flag' />
          <span className='ms-1'>فارسی</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={(e) => handleLangUpdate(e, "en")}>
          <img src={usFlag} className='country-flag' />
          <span className='ms-1'>English</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
