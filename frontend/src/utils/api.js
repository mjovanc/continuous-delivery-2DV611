import axios from 'axios'
import { getUserToken } from './auth-cookies'
import { API_URL } from './config'

/**
 * Register
 *
 * @param {object} user
 */
export const signup = async (user) => {
  const request = await axiosInstance()
  return request
    .post('api/user/register', user)
    .then((response) => response)
    .catch((err) => console.error(err))
}

/**
 * Login
 *
 * @param {object} user
 */
export const login = async (user) => {
  const request = await axiosInstance()
  return request
    .post('api/user/login', user)
    .then((response) => response)
    .catch((err) => console.error(err))
}

/**
 * Get user logs
 *
 * @param {object} log
 */
export const getLogs = async (userId) => {
  const request = await axiosInstance()
  return request
    .get(`api/task/${userId}`)
    .then((response) => response.data)
    .catch((err) => console.error(err))
}

/**
 * Create a new log
 *
 * @param {object} log
 */
export const createLog = async (log) => {
  const request = await axiosInstance()
  return request
    .post('api/task', log)
    .then((response) => response)
    .catch((err) => console.error(err))
}

/**
 * Delete log
 *
 * @param {object} log
 */
export const deleteLog = async (id) => {
  const request = await axiosInstance()
  return request
    .delete(`api/task/${id}`)
    .then((response) => response)
    .catch((err) => console.error(err))
}

/**
 * Custom axios object
 */
const axiosInstance = async () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Accept: 'application/json',
      Authorization: process.browser && await getUserToken()
    }
  })
}
