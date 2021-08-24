export default async (endpoint = '', { body, ...customConfig } = {}) => {
  const config = {
    body: body && JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    ...customConfig,
  }

  return await fetch(import.meta.env.VITE_API_URL + endpoint, config)
    .then(res => res && res.json())
    .then(data => [null, data || {}])
    .catch(err => [err, null])
}
