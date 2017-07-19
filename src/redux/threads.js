/**
 * Apply redux-duck proposal: https://github.com/erikras/ducks-modular-redux
 */
import {
	createActions,
	handleActions,
} from 'redux-actions'

import * as loadingState from '../constants/loadingState'

export const FETCH_ALL_THREADS = 'FETCH_ALL_THREADS'
export const FETCH_ALL_THREADS_SUCCESS = 'FETCH_ALL_THREADS_SUCCESS'
export const FETCH_ALL_THREADS_FAILED = 'FETCH_ALL_THREADS_FAILED'

export const EDIT_THREAD = 'EDIT_THREAD'
export const EDIT_THREAD_SUCCESS = 'EDIT_THREAD_SUCCESS'
export const EDIT_THREAD_FAILED = 'EDIT_THREAD_FAILED'

export const CREATE_THREAD = 'CREATE_THREAD'
export const CREATE_THREAD_SUCCESS = 'CREATE_THREAD_SUCCESS'
export const CREATE_THREAD_FAILED = 'CREATE_THREAD_FAILED'

// action creators
export const {
	fetchAllThreads,
	fetchAllThreadsSuccess,
  fetchAllThreadsFailed,
  editThread,
  editThreadSuccess,
  editThreadFailed,
  createThread,
  createThreadSuccess,
  createThreadFailed,
} = createActions({
	[FETCH_ALL_THREADS]: limit => ({
		limit,
	}),
	[FETCH_ALL_THREADS_SUCCESS]: threads => ({
		threads,
	}),
	[FETCH_ALL_THREADS_FAILED]: errorMessage => ({
		errorMessage,
  }),
  [EDIT_THREAD]: ({ id, topic, vote }) => ({
    id,
    topic,
    vote,
  }),
  [EDIT_THREAD_SUCCESS]: thread => ({
    thread,
  }),
  [EDIT_THREAD_FAILED]: errorMessage => ({
    errorMessage,
  }),
  [CREATE_THREAD]: topic => ({
    topic,
  }),
  [CREATE_THREAD_SUCCESS]: thread => ({
    thread,
  }),
  [CREATE_THREAD_FAILED]: errorMessage => ({
    errorMessage,
  }),
})

const INIT_STATE = {
	data: [],
  loading: loadingState.EMPTY,
  voting: loadingState.EMPTY,
	errorMessage: null,
}

// reducer
const reducer = handleActions({
	[fetchAllThreads]: (state, action) => ({
		...state,
		loading: loadingState.LOADING,
	}),
	[fetchAllThreadsSuccess]: (state, action) => ({
		...state,
		loading: loadingState.READY,
		data: [
			...state.data,
			...action.payload.threads,
		],
	}),
	[fetchAllThreadsFailed]: (state, action) => ({
		...state,
		loading: loadingState.ERROR,
		errorMessage: action.payload.errorMessage,
  }),
  [editThread]: (state, action) => ({
    ...state,
    voting: loadingState.LOADING,
  }),
  [editThreadSuccess]: (state, action) => ({
    ...state,
    voting: loadingState.READY,
    data: state.data.map(thread => {
      if (
        action.payload.thread &&
        action.payload.thread.id === thread.id
      ) {
        return action.payload.thread
      }

      return thread
    }),
  }),
  [editThreadFailed]: (state, action) => ({
    errorMessage: action.payload.errorMessage,
  }),
  [createThread]: (state, action) => ({
    ...state,
		loading: loadingState.LOADING,
  }),
  [createThreadSuccess]: (state, action) => ({
    ...state,
    data: state.data.unshift(action.payload.thread),
  }),
  [createThreadFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default reducer