import React, { Component, PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

import styles from './App.css'

injectTapEventPlugin()

class App extends Component {
	render () {
		return (
			<div>
    		{this.props.children}
  		</div>
		)
	}
}

App.propTypes = {
  children: PropTypes.node,
}

export default App
