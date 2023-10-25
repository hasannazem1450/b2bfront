import { Home, Box, Settings, BarChart2, Users, Phone } from "react-feather"

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/"
  },
  {
    id: "products",
    title: "Products",
    icon: <Box size={20} />,
    navLink: "/products"
  },
  {
    id: "producers",
    title: "Producers",
    icon: <Settings size={20} />,
    navLink: "/profile"
  },
  {
    id: "office",
    title: "offices",
    icon: <BarChart2 size={20} />,
    navLink: "/office"
   },
  // {
  //   id: "about",
  //   title: "About",
  //   icon: <Users size={20} />,
  //   navLink: "/about"
  // },
  {
    id: "contact",
    title: "Contact",
    icon: <Phone size={20} />,
    navLink: "/contact"
  }
]
