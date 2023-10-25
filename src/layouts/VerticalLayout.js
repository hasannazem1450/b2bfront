// ** React Imports
import { Outlet } from "react-router-dom"

// ** Third Party Components
import { useTranslation } from "react-i18next"

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout"

// ** Menu Items Array
import navigation from "@src/navigation/vertical"

// ** Custom VerticalLayout Components
import CustomMenu from "./vertical/menu"
import CustomNavbar from "./vertical/navbar"
import CustomFooter from "./vertical/footer"

const VerticalLayout = (props) => {
  const { t: translate } = useTranslation(["menu"])

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
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
