import { useState } from "react"
import Sidebar from "./Sidebar"
import Products from "./Products"
import "@styles/react/apps/app-ecommerce.scss"

export default function Shop() {
  const [activeView, setActiveView] = useState("grid")

  return (
    <div className='ecommerce-application'>
      <Sidebar />
      <Products activeView={activeView} setActiveView={setActiveView} />
    </div>
  )
}
