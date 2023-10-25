import { lazy } from "react"

const NotAuthorized = lazy(() => import("../../views/misc/NotAuthorized"))
const Error = lazy(() => import("../../views/misc/Error"))

export default [
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
    meta: {
      layout: "blank",
      publicRoute: true
    }
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
      publicRoute: true
    }
  }
]
