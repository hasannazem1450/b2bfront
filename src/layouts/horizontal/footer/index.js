import { useTranslation } from "react-i18next"

export default function CustomFooter() {
  const { t: translate } = useTranslation(["footer"])

  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        <span>
          {translate("copyright")} © {new Date().getFullYear()}
        </span>
      </span>
    </p>
  )
}
