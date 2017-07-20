import { call, put } from 'redux-saga/effects'

import * as actions from '../redux/threads'
import * as sagas from './threads'
import * as apis from '../apis/threads'

describe('fetch all threads flow', () => {
  test('fetch all threads success', () => {
    const action = {
      payload: {
        limit: 10,
      },
    }

    const gen = sagas.fetchAllThreadsFlow(action)

    expect(gen.next().value).toEqual(call(apis.fetchAllThreads, action.payload.limit))

    const expectedResponse = {
      status: 200,
      data: [
        {
          id: 1,
          topic: 'golang',
          vote: 12,
        },
        {
          id: 2,
          topic: 'graphql',
          vote: 123,
        },
      ],
    }

    expect(gen.next(expectedResponse).value).toEqual(
      put(actions.fetchAllThreadsSuccess(expectedResponse.data))
    )
  })

  test('fetch all threads flow failed', () => {
    const action = {
      payload: {
        limit: 10,
      },
    }

    const gen = sagas.fetchAllThreadsFlow(action)

    expect(gen.next().value).toEqual(call(apis.fetchAllThreads, action.payload.limit))

    const expectedResponse = {
      status: 500,
      error: {
        message: 'internal server error',
      },
    }

    expect(gen.next(expectedResponse).value).toEqual(
      put(actions.fetchAllThreadsFailed(expectedResponse.error.message))
    )
  })
})

describe('edit thread flow', () => {
  test('edit thread flow success', () => {
    const action = {
      payload: {
        id: 1,
        topic: 'jest sinon',
        vote: 32,
      },
    }

    const gen = sagas.editThreadFlow(action)

    expect(gen.next().value).toEqual(call(apis.editThread, action.payload))

    const expectedResponse = {
      status: 200,
      data: {
        id: 1,
        topic: 'jest sinon',
        vote: 32,
      },
    }

    expect(gen.next(expectedResponse).value).toEqual(
      put(actions.editThreadSuccess(expectedResponse.data))
    )
  })

  test('edit thread flow failed', () => {
    const action = {
      payload: {
        id: 1,
        topic: 'jest sinon',
        vote: 32,
      },
    }

    const gen = sagas.editThreadFlow(action)

    expect(gen.next().value).toEqual(call(apis.editThread, action.payload))

    const expectedResponse = {
      status: 500,
      error: {
        message: 'internal server error',
      },
    }

    expect(gen.next(expectedResponse).value).toEqual(
      put(actions.editThreadFailed(expectedResponse.error.message))
    )
  })
})

describe('create new thread flow', () => {
  test('create new thread success', () => {
    const newThread = {
      id: 2,
      topic: 'docker',
      vote: 0,
    }

    const action = {
      payload: {
        topic: newThread.topic,
      },
    }

    const gen = sagas.createThreadFlow(action)

    expect(gen.next().value).toEqual(call(apis.createThread, action.payload.topic))

    const expectedResponse = {
      status: 200,
      data: newThread,
    }

    expect(gen.next(expectedResponse).value).toEqual(
      put(actions.createThreadSuccess(expectedResponse.data))
    )
  })

  test('create new thread failed', () => {
    const newThread = {
      id: 2,
      topic: 'docker',
      vote: 0,
    }

    const action = {
      payload: {
        topic: '',
      },
    }

    const gen = sagas.createThreadFlow(action)

    expect(gen.next().value).toEqual(call(apis.createThread, action.payload.topic))

    const expectedResponse = {
      status: 400,
      error: {
        message: 'topic not provided',
      },
    }

    expect(gen.next(expectedResponse).value).toEqual(
      put(actions.createThreadFailed(expectedResponse.error.message))
    )
  })
})
