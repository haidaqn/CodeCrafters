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
  dashboard: {},
  category: {
    list: `${VERSION_PREFIX}/categories`,
    create: `${VERSION_PREFIX}/categories`,
    update: (id: number) => `${VERSION_PREFIX}/categories/${id}`,
    delete: (id: number) => `${VERSION_PREFIX}/categories/${id}`,
  },
  language: {
    list: `${VERSION_PREFIX}/languages`,
    create: `${VERSION_PREFIX}/languages`,
    block: `${VERSION_PREFIX}/languages/block`,
    update: (id: number) => `${VERSION_PREFIX}/languages/${id}`,
    delete: (id: number) => `${VERSION_PREFIX}/languages/${id}`,
  },
  contest: {
    list: `${VERSION_PREFIX}/contests`,
    create: `${VERSION_PREFIX}/contests`,
    update: (id: number) => `${VERSION_PREFIX}/contests/${id}`,
    delete: (id: number) => `${VERSION_PREFIX}/contests/${id}`,
  },
  problem: {
    list: `${VERSION_PREFIX}/problems`,
    create: `${VERSION_PREFIX}/problems`,
    update: (id: number) => `${VERSION_PREFIX}/problems/${id}`,
    delete: (id: number) => `${VERSION_PREFIX}/problems/${id}`,
  },
  submission: {
    list: `${VERSION_PREFIX}/submissions`,
    create: `${VERSION_PREFIX}/submissions`,
    update: (id: number) => `${VERSION_PREFIX}/submissions/${id}`,
    delete: (id: number) => `${VERSION_PREFIX}/submissions/${id}`,
  },
  user: {
    list: `${VERSION_PREFIX}/users`,
    block: `${VERSION_PREFIX}/users/block`,
    update: (id: number) => `${VERSION_PREFIX}/users/${id}`,
  },
};