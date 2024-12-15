'use client'

import axios from 'axios'
import {useRouter} from "next/router";
import {HOST_API} from '@/global-config';

//----------------------------------------------------------------------

const axiosInstance = axios.create({baseURL: HOST_API})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        const router = useRouter()
        router.push('/login').then(r => {
        })
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
  }
)

export default axiosInstance

// ----------------------------------------------------------------------

const VERSION_PREFIX = '/v1';

export const endpoints = {
  auth: {
    login: `${VERSION_PREFIX}/auth/login`,
    register: `${VERSION_PREFIX}/auth/register`,
    forgot: `${VERSION_PREFIX}/auth/forgot-password`,
    verify: `${VERSION_PREFIX}/auth/verify`,
    resend: `${VERSION_PREFIX}/auth/resend`,
    sso: (serviceId: string) => `${VERSION_PREFIX}/auth/oauth/${serviceId}`,
  },
};