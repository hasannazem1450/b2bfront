// ** React Imports
import { Outlet, useLocation } from "react-router-dom"

// ** Third Party Components
import { useTranslation } from "react-i18next"

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/HorizontalLayout"

// ** Menu Items Array
import navigation from "@src/navigation/horizontal"

// ** Custom HorizontalLayout Components
import CustomMenu from "./horizontal/menu"
import CustomNavbar from "./horizontal/navbar"
import CustomFooter from "./horizontal/footer"

const HorizontalLayout = (props) => {
  const { t: translate } = useTranslation(["menu"])
  const location = useLocation()

  const translateMenuItems = (data) => {
    return data.map((item) => {
      const { title, children } = item

      if (children) {
        return {
          ...item,
          children: translateMenuItems(children),
          title: translate(title)
        }
      } else {
        return {
          ...item,
          title: translate(title)
        }
      }
    })
  }

  return (
    <Layout
      menuData={translateMenuItems(navigation)}
      menu={(props) => <CustomMenu {...props} />}
      navbar={(props) => <CustomNavbar {...props} />}
      footer={<CustomFooter />}
      {...props}
    >
      {location.pathname === "/"  }
      <Outlet />
    </Layout>
  )
}

export default HorizontalLayout
