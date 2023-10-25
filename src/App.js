import React, { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useRTL } from "@hooks/useRTL"
import Router from "./router/Router"

const App = () => {
  const { i18n } = useTranslation()
  const [isRtl] = useRTL()

  const element = document.getElementsByTagName("html")[0]
  if (i18n.language === "ir" && isRtl) {
    element.setAttribute("lang", "fa")
  } else {
    element.setAttribute("lang", "en")
  }

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
