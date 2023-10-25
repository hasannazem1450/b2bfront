import { lazy } from "react"

const Public = lazy(() => import("../../views/public/ProfileSelector"))
const Wizard = lazy(() => import("../../views/public/wizard"))
const Profile = lazy(() => import("../../views/public/profile"))
const Products = lazy(() => import("../../views/public/shop"))
const Login = lazy(() => import("../../views/auth/Login"))
const HomePage = lazy(() => import("../../views/public/HomePage"))
export default [
  {
    path: "/",
    element: <HomePage />,
    index: true,
    meta: {
      layout: "horizontal",
      publicRoute: true
    }
  },
  {
    path: "/Public",
    element: <Public />,
    meta: {
      layout: "horizontal",
      publicRoute: true
    }
  },
  {
    path: "/Login",
    index: true,
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true
  
    }
  },

  {
    path: "/Public",
    element: <Public />,
    meta: {
      layout: "horizontal",
      publicRoute: true
    }
  },
  {
    path: "/wizard",
    index: true,
    element: <Wizard />,
    meta: {
      layout: "horizontal",
      publicRoute: true
    }
  },
  {
    path: "/products",
    index: true,
    element: <Products />,
    meta: {
      layout: "horizontal",
      publicRoute: true
    }
  },
  {
    path: "/profile",
    element: <Profile />,
    meta: {
      layout: "horizontal",
      publicRoute: true
    }
  }
]
