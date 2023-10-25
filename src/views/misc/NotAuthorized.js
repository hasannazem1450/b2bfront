import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import "@styles/base/pages/page-misc.scss"

export default function NotAuthorized() {
  const { t: translate } = useTranslation(["auth"])

  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>{translate("You are not authorized!")}</h2>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
            {translate("Back to home")}
          </Button>
        </div>
      </div>
    </div>
  )
}
