/* global __CLIENT__ */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import configureStore from './store/configureStore'
import rootReducer from './redux/reducers'
import routes from './routes'

// initialize material muiTheme object.
// providing the identical theme object on the server side too.
// @issue: https://stackoverflow.com/questions/35481084/react-starter-kit-and-material-ui-useragent-should-be-supplied-in-the-muitheme
export const muiTheme = getMuiTheme(null, {
  userAgent: 'all',
})

if (__CLIENT__) {
  const initialState = window.__INITIAL_STATE__

  const store = configureStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept()
  }

  const App = () => (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router routes={routes} history={browserHistory} />
      </MuiThemeProvider>
    </Provider>
  )

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}


