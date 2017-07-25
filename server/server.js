import http from 'http'

import app from './app'

const server = http.createServer(app)

server.listen(3005, () => {
  console.log('listening in port 3005')
})
