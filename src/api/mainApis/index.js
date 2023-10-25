import http from "../http"
import urls from "../urls"

export const getProvince = () => {
  return http.get(urls.provinces.province)
}

export const getCity = (data) => {
  return http.post(urls.cities.city, data)
}

export const getIndustrialPark = () => {
  return http.get(urls.industrialparks.industrialpark)
}

export const getEventinfo = () => {
  return http.get(urls.eventinfos.eventinfo)
}

