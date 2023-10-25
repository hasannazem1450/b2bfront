import http from "../http"
import urls from "../urls"

export const createProfile = (data) => {
  return http.post(urls.smeProfile.create, data)
}
export const getProfile = (data) => {
  return http.post(urls.showProfile.show, data)
}
export const getPosition = () => {
  return http.get(urls.positions.position)
}