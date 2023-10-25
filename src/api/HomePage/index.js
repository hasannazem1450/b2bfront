import http from "../http"
import urls from "../urls"

export const GetlatesProfile = () => {
  return http.get(urls.homePage.latesProfile)
}
