import http from "../http"
import urls from "../urls"

export const signUp = (data) => {
  return http.post(urls.auth.signUp, data)
}

export const signIn = (data) => {
  return http.put(urls.auth.signIn, data)
}

export const signOut = () => {
  return http.get(urls.auth.signOut)
}
