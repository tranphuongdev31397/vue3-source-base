import { axios, axiosInstance } from './index'
import { getBearerToken } from '@/services/localStorage'

import { ErrorCode } from '@/constants'
import { refreshToken } from '@/apis/authentication/authenticationServices'

axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something with request
    return config
  },
  async (error: any) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error: any) => {
    const res: ResponseError = error.response.data
    if (res?.errorCode == ErrorCode.AccessTokenExpired && !error.config._isRetry) {
      return refreshToken().then((response) => {
        if (response) {
          error.config._isRetry = true
          const originalRequestConfig = error.config
          originalRequestConfig.headers.Authorization = getBearerToken()
          return axiosInstance.request(originalRequestConfig)
        }
      })
    }

    return Promise.reject(error)
  }
)
