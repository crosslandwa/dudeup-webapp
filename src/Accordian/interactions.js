import { removeNotification } from '../Notifications/interactions'

// ------ACTIONS------
export const closeAccordian = () => ({ type: 'ACCORDIAN_CLOSE' })
export const openAccordian = id => ({ type: 'ACCORDIAN_OPEN', id })

// ------SELECTORS------
export const isAccordianOpen = (state, id) => state.accordian.id === id

// ------REDUCERS------
const initialState = { id: undefined }

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCORDIAN_CLOSE':
      return initialState
    case 'ACCORDIAN_OPEN':
      return { id: action.id }
  }
  return state
}

// ------MIDDLEWARE------
export const middleware = ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case 'ACCORDIAN_OPEN':
      dispatch(removeNotification())
      return next(action)
  }
  return next(action)
}
