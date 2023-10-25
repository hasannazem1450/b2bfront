import axios from "axios"
import toast from "react-hot-toast"
import { X } from "react-feather"
import { loadProgressBar } from "axios-progress-bar"
import { getUserData } from "@utils"
import "axios-progress-bar/dist/nprogress.css"

const user = getUserData()

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: user?.token || ""
  }
})

const ToastContent = ({ t, title, message }) => {
  return (
    <div className='d-flex'>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6 className='text-white'>{title}</h6>
          <X size={12} className='text-white cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span className='text-white'>{message}</span>
      </div>
    </div>
  )
}

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  }
  // function (error) {
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   toast((t) => <ToastContent t={t} title={"کاربر گرامی"} message={error.response.data.message} />, {
  //     duration: 5000,
  //     style: {
  //       background: "var(--bs-danger)"
  //     }
  //   })
  //   return Promise.reject(error)
  // }
)

const progressBarOptions = { showSpinner: false }
loadProgressBar(progressBarOptions, axiosClient)

export default {
  get: axiosClient.get,
  post: axiosClient.post,
  put: axiosClient.put,
  patch: axiosClient.patch,
  delete: axiosClient.delete
}
