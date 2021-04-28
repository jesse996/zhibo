import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL: 'http://u.jesse233.top:8090/',
  timeout: 10000,
})

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    // Do something before request is sent
    if (response.status !== 200 || response.data.code !== 0) {
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default http
