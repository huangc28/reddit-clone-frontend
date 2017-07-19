/**
 * This is not the most optimized way to setup the config
 */
const devEnv = {
  CLIENT_API_HOST: 'http://localhost:3005/api',
  SERVER_API_HOST: 'http://localhost:3007',
}

const prodEnv = {
  CLIENT_API_HOST: 'http://139.59.236.216:3005/api',
  SERVER_API_HOST: 'http://139.59.236.216:3007',
}

export default function env () {
  if (process.env.NODE_ENV === 'production') {
    return prodEnv
  }

  return devEnv
}