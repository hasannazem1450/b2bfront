import { Home, User, Shield, Circle } from "react-feather"

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/dashboard"
  },
  {
    id: "users",
    title: "Users",
    icon: <User size={20} />,
    navLink: "/dashboard/users"
  },
  {
    id: "roles_permisions",
    title: "Roles & Permissions",
    icon: <Shield size={20} />,
    children: [
      {
        id: "roles",
        title: "Roles",
        icon: <Circle size={12} />,
        navLink: "/dashboard/roles"
      },
      {
        id: "permissions",
        title: "Permissions",
        icon: <Circle size={12} />,
        navLink: "/dashboard/permissions"
      }
    ]
  }
]
