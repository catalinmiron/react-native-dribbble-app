/*
  Created by Uncle Charlie, 2016/11/15

  @flow
*/
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import reducers from '../reducers'

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  callapsed: true,
  duration: true,
})

var createAppStore = applyMiddleware(thunk, logger)(createStore)

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

export default function configureStore(onComplete: ?() => void) {
  // const store = autoRehydrate()(createAppStore)(reducers)
  const store = createAppStore(reducers)
  persistStore(store, {storage: AsyncStorage}, onComplete)
  
  if (isDebuggingInChrome) {
    window.store = store
  }

  return store
}
