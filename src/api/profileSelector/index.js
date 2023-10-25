import http from "../http"
import urls from "../urls"

export const getAllProfiles = () => {
  return http.get(urls.profileSelector.getAllProfiles)
}

