import reducer, {
  fetchAllThreads,
	fetchAllThreadsSuccess,
  fetchAllThreadsFailed,
  editThread,
  editThreadSuccess,
  editThreadFailed,
  createThread,
  createThreadSuccess,
  createThreadFailed,
 } from './threads'

import * as loadingState from '../constants/loadingState'

const INIT_STATE = {
  data: [],
  loading: loadingState.EMPTY,
  voting: loadingState.EMPTY,
	errorMessage: null,
}

describe('fetch threads', () => {
  test('calculate fetching threads action', () => {
    const expectNextState = {
      ...INIT_STATE,
      loading: loadingState.LOADING,
    }

    const nextState = reducer(INIT_STATE, fetchAllThreads())

    expect(nextState).toEqual(expectNextState)
  })

  test('calculate fetching threads success', () => {
    const payload = [
      {
        id: 1,
        topic: 'js',
        vote: 999,
      },
      {
        id: 2,
        topic: 'golang',
        vote: 87,
      },
    ]

    const expectNextState = {
      ...INIT_STATE,
      loading: loadingState.READY,
      data: payload,
    }

    const nextState = reducer(INIT_STATE, fetchAllThreadsSuccess(payload))

    expect(expectNextState).toEqual(nextState)
  })

  test('calculate fetching threads failed', () => {
    const payload = 'internal server error'

    const expectNextState = {
      ...INIT_STATE,
      loading: loadingState.ERROR,
      errorMessage: payload,
    }

    const nextState = reducer(INIT_STATE, fetchAllThreadsFailed(payload))

    expect(nextState).toEqual(expectNextState)
  })
})

describe('edit thread', () => {
  test('calculate edit thread success', () => {
    const topics = [
      {
        id: 1,
        topic: 'ES6',
        vote: 100,
      },
      {
        id: 2,
        topic: 'golang',
        vote: 123,
      },
    ]

    const edittedTopic = {
      id: 1,
      topic: 'ES6 with babel',
      vote: 101,
    }

    const nextState = reducer({
      ...INIT_STATE,
      data: topics,
    }, editThreadSuccess(edittedTopic))

    expect(nextState).toEqual({
      ...INIT_STATE,
      data: [
        edittedTopic,
        topics[1],
      ],
      voting: loadingState.READY,
    })
  })
})

describe('create thread', () => {
  test('calculate creat thread success', () => {
    const payload = {
      id: 1,
      topic: 'ES6',
      vote: 332,
    }

    const nextState = reducer(INIT_STATE, createThreadSuccess(payload))

    expect(nextState).toEqual({
      ...INIT_STATE,
      loading: loadingState.READY,
      data: [
        payload,
      ],
    })
  })
})