import { clone } from '../reducers'
import { selectItemIdsForDude } from './selectors'
const initialState = {
  byId: {},
  allIds: []
}

export function itemsReducer (state = initialState, action) {
  switch (action.type) {
    case 'ITEM_NEW':
      return addItem(state, action.id, action.dudeId)
    case 'ITEM_UPDATE_DESCRIPTION':
      return updateDescription(state, action.id, action.description)
    case 'ITEM_UPDATE_PRICE':
      return updatePrice(state, action.id, action.price)
    case 'ITEM_REMOVE':
      return removeItem(state, action.id)
    case 'DUDE_REMOVE':
      return state.allIds.map(id => state.byId[id])
        .filter(item => item.dudeId === action.id)
        .reduce((updated, item) => {
          return removeItem(updated, item.id)
        }, state)
    default:
      return state
  }
}

function addItem (state, id, dudeId) {
  const updated = clone(state)
  updated.byId[id] = { id, price: '', description: '', dudeId }
  if (!updated.allIds.includes(id)) {
    updated.allIds = updated.allIds.concat(id)
  }
  return updated
}

function updateDescription(state, id, description) {
  const updated = clone(state)
  updated.byId[id].description = description
  return updated
}

function updatePrice(state, id, price) {
  const updated = clone(state)
  updated.byId[id].price = price
  return updated
}

function removeItem (state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(other => other !== id)
  return updated
}
