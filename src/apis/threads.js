import fetch from 'axios'

const BASE_URL = 'http://localhost:3005'

export const fetchAllThreads = limit => (
  fetch.get(`${BASE_URL}/api/topics?limit=${limit}`)
  .then(response => response.data)
)

export const editThread = params => (
  fetch.put(`${BASE_URL}/api/topic/${params.id}`, {
    ...params,
  })
  .then(response => response.data)
)

export const createThread = topic => (
  fetch.post(`${BASE_URL}/api/topic/${params.id}`, {
    topic,
  })
  .then(response => response.data)
)
