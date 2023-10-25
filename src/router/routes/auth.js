import { lazy } from "react"

const Login = lazy(() => import("../../views/auth/Login"))
const Register = lazy(() => import("../../views/auth/Register"))
const ForgotPassword = lazy(() => import("../../views/auth/ForgotPassword"))
const TwoSteps = lazy(() => import("../../views/auth/TwoSteps"))

export default [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/two-steps-verification",
    element: <TwoSteps />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  }
]
