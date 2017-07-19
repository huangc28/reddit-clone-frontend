import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './CreateThread.css'
import { createThread as createTopic } from '../../redux/threads'

const MAX_CARACTERS_LIMIT = 255

class CreateThread extends Component {
  state = {
    topic: '',
    errorMessage: '',
  }

  onInput = evt => {
    const { value } = evt.target

    if (value.length < MAX_CARACTERS_LIMIT) {
      this.setState({
        topic: value,
        errorMessage: '',
      })

      return
    }

    this.setState({
      errorMessage: 'exceeding max number of characters',
    })
  }

  onSubmit = () => {
    const { topic } = this.state

    this.props.createTopic(topic)
  }

  render () {
    const {
      topic,
      errorMessage,
    } = this.state

    return (
      <div className={styles.root}>
        {/* Topic */}
        <div className={styles.container}>
          <TextField
            hintText="Topic"
            floatingLabelText="Topic"
            onInput={this.onInput}
            multiLine
            value={topic}
            errorText={errorMessage}
          />
        </div>

        {/* submit */}
        <div className={styles.container}>
          <RaisedButton
            label="Submit"
            primary
            onClick={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

CreateThread.propsTypes = {
  createTopic: PropTypes.func,
}

export default connect(null, {
  createTopic,
})(CreateThread)