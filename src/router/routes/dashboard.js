import { lazy } from "react"

const Dashboard = lazy(() => import("../../views/dashboard"))
const Users = lazy(() => import("../../views/dashboard/users"))

export default [
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard/users",
    element: <Users />
  }
]
