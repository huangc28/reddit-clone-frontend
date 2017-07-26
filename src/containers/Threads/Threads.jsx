import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import ThreadsList from '../../components/ThreadsList'
import Thread from '../../components/Thread'
import { THREADS_LIMIT } from '../../constants/threads.js'
import { fetchAllThreadsFlow } from '../../sagas/threads'

import {
	editThread,
	fetchAllThreads,
} from '../../redux/threads'

class Threads extends Component {
	static preload () {
		// ssr method for this component.
		return fetchAllThreadsFlow
	}

	onDownVote = ({ id, vote }) => {
	  this.props.editThread({id, vote})
	}

	onUpvote = ({ id, vote }) => {
		this.props.editThread({id, vote})
	}

	componentDidMount = () => {
		this.props.fetchAllThreads()
	}

	render () {
		const { threads } = this.props

		return (
      <div>
        <h3> Topic List </h3>

        <div>
          <RaisedButton
            label="create topic"
            onClick={() => browserHistory.push('/create')}
          />
        </div>

				<ThreadsList>
					{
						threads.map((thread, index) => (
							<Thread
								key={index}
								thread={thread}
								onUpvote={this.onUpvote}
								onDownvote={this.onDownVote}
							/>
						))
					}
				</ThreadsList>
			</div>
		)
	}
}

Threads.propTypes = {
	editThread: PropTypes.func,
	fetchAllThreads: PropTypes.func,
}

const mapStateToProps = state => ({
	threads: state.threads.data,
})

export default connect(mapStateToProps, {
	editThread,
	fetchAllThreads,
})(Threads)