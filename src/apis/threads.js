import fetch from 'axios'
import url from 'url'

import env from '../../env'

const CLIENT_API_HOST = env().CLIENT_API_HOST

/**
 * @param {string} apiUrl
 * @param {object} queries
 */
export const buildApiUrl = (apiPath, queries = {}) => {
  const apiUrl = url.parse(`${CLIENT_API_HOST}/${apiPath}`)

  // get pre-existed query
  const query = apiUrl.query || {}

  // merge queries
  Object.assign(query, queries)

  // if query object is not empty, assign query
  if (Object.keys(query).length) apiUrl.query = query

  return apiUrl.format()
}

export const fetchAllThreads = limit => (
  fetch.get(buildApiUrl('topics'))
  .then(response => response.data)
)

export const editThread = params => (
  fetch.put(buildApiUrl(`topic/${params.id}`), {
    ...params,
  })
  .then(response => response.data)
)

export const createThread = topic => (
  fetch.post(buildApiUrl('topic'), {
    topic,
  })
  .then(response => response.data)
)
