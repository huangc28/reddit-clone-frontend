import React, { Component, PropTypes } from 'react'

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
          <div onClick={this.onUpvote}>
            up
          </div>

          {/* vote */}
          <div>
            { vote }
          </div>

          {/* downvote */}
          <div onClick={this.onDownvote}>
            down
          </div>
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
