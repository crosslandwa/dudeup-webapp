import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as dudes } from './DudeList/interactions'
import { reducer as modal } from './Modal/interactions'

const reducer = combineReducers({
  persisted: combineReducers({
    dudes
  }),
  modal
})
const naturalEnhancer = (createStore) => (...args) => createStore(...args)

const localStorageAvailable = !!(window && window.localStorage)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function createAppStore () {
  const middlewares = []
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middlewares),
      localStorageAvailable ? persistState('persisted', { key: 'dude-up' }) : naturalEnhancer
    )
  )
}

export default createAppStore
