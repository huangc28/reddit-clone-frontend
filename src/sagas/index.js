import { all, call } from 'redux-saga/effects'

import threadsFlow from './threads'

export default function * root() {
  yield all([
    call(threadsFlow),
  ])
}
