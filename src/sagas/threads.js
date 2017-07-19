import { call, put, takeLatest, all } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as apis from '../apis/threads'
import * as actions from '../redux/threads'

export function * fetchAllThreadsFlow (action) {
  const { payload: { limit } = {} } = action

  try {
    const response = yield call(apis.fetchAllThreads, limit)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchAllThreadsSuccess(response.data))
  } catch (err) {
    yield put(actions.fetchAllThreadsFailed(err.message))
  }
}

export function * editThreadFlow (action) {
  const { payload } = action

  try {
    const response = yield call(apis.editThread, action.payload)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.editThreadSuccess(response.data))
  } catch (err) {
    yield put(actions.editThreadFailed(err.message))
  }
}

export function * createThreadFlow (action) {
  const { payload: { topic } } = action

  try {
    const response = yield call(apis.createThread, topic)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.createThreadSuccess(response.data))

    browserHistory.push('/')
  } catch (err) {
    yield put(actions.createThreadFailed(err.message))
  }
}

export default function * threadsFlow () {
  yield all([
    takeLatest(actions.FETCH_ALL_THREADS, fetchAllThreadsFlow),
    takeLatest(actions.EDIT_THREAD, editThreadFlow),
    takeLatest(actions.CREATE_THREAD, createThreadFlow),
  ])
}