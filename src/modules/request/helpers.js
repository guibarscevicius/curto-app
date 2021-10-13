export const createQuery = (params = {}) =>
  params && typeof params === 'object'
    && !Array.isArray(params) && Object.keys(params).length
    ? '?' + new URLSearchParams(params).toString()
    : ''
