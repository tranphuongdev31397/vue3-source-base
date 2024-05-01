import { ENV } from '@/configs/env'
import axiosRequest from 'axios'

export const axios = axiosRequest.create({
  baseURL: ENV.API_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

export const axiosInstance = axios
