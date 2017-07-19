import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'

import styles from './Thread.css'

/**
 * @todo use material for icon button - UI
 */
class Thread extends Component {
  onDownvote = () => {
    const { thread: { id, vote } } = this.props

    this.props.onDownvote({
      id,
      vote: vote - 1,
    })
  }

  onUpvote = () => {
    const { thread: {id, vote} } = this.props

    this.props.onUpvote({
      id,
      vote: vote + 1,
    })
  }

  render () {
    const {
      thread: {
        vote,
        topic,
      } = {},
      onUpvote,
      onDownvote,
    } = this.props

    return (
      <div className={styles.root}>
        <div className={styles.voteBar}>

          {/* upvote */}
          <IconButton
            iconClassName="material-icons"
            tooltip="Up Vote"
            onTouchTap={this.onUpvote}
          >
            keyboard_arrow_up
          </IconButton>

          {/* vote */}
          <div>
            { vote }
          </div>

          {/* downvote */}
          <IconButton
            iconClassName="material-icons"
            tooltip="Down Vote"
            onTouchTap={this.onDownvote}
          >
            keyboard_arrow_down
          </IconButton>
        </div>

        {/* topic */}
        <div className={styles.topicBar}>
          { topic }
        </div>
      </div>
    )
  }
}

Thread.propTypes = {
  thread: PropTypes.object,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
}

Thread.defaultProps = {
  thread: {},
}

export default Thread
