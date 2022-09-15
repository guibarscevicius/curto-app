import { createQuery } from './helpers'
import * as Sentry from '@sentry/browser'

const request = (endpoint = '', { body, ...config }) =>
  fetch(import.meta.env.VITE_API_URL + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
    ...(config || {}),
  })
    .then(res => res && res.json())
    .then(data => [null, data || {}])
    .catch(err => {
      Sentry.captureException(err)
      return [err, null]
    })

export default {
  get: (url, params) =>
    request(url + createQuery(params), { method: 'GET' }),

  post: (url, body) =>
    request(url, { body, method: 'POST' }),

  put: (url, body) =>
    request(url, { body, method: 'PUT' }),

  delete: url =>
    request(url, { method: 'DELETE' }),
}
