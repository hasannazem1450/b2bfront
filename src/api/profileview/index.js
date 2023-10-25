import http from "../http"
import urls from "../urls"

export const showProfile = (data) => {
  return http.post(urls.showProfile.show, data)
}

export const showMembers = (data) => {
  return http.post(urls.showProfile.member, data)
}

export const showNews = (data) => {
  return http.post(urls.showProfile.news, data)
}