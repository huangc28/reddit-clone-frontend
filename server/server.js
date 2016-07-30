import 'babel-polyfill'
import express from 'express'
import { resolve, join } from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../src/routes'
import renderFullPage from './utils/render'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import reducers from '../src/reducers'
import webpackConfig from '../webpack.config.js'
import webpack from 'webpack'

const ROOT_PATH = resolve(__dirname)
const app = express()
const staticPath = resolve(ROOT_PATH, '..', 'build')
const compiler = webpack(webpackConfig)

// serve static files.
app.use('/build', express.static(staticPath))

function handleRender (req, res) {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {

      // route is found, prepare html string...
      const html = renderToString(<RouterContext {...renderProps} />)

      // prepare redux store
      const store = createStore(reducers)

      // get the initial state from redux store
      const initialState = store.getState()

      // render full page along with html and redux store
      res.send(renderFullPage(html, initialState))
    }
    // route is not found, send 404 not found page.
  })
}

app.use(handleRender)

app.listen(3005, () => {
  console.log('listening in port 3005')
})
