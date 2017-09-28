import { clone } from '../reducers'
import SettleUp from 'settleup'

import { selectAllDudeIdsForList } from '../dudes/selectors'
import { selectSelectedListId } from '../lists/selectors'
import { selectItemIdsForDude, selectItemPrice } from '../items/selectors'

const initialState = {
  averageAmountPerGroupMember: 0,
  groupTotal: 0,
  amountOwedByGroupMember: {},
  totalPaidPerGroupMember: {}
}
const actionsThatDoNotAffectPrices = [
  'DUDE_UPDATE_NAME',
  'ITEM_UPDATE_DESCRIPTION',
  'LIST_ADD',
  'LIST_UPDATE_NAME'
]

export function settleUpReducer (state = initialState, action) {
  return state
}

export function settleUpCalculationsReducer (state, action) {
  if (actionsThatDoNotAffectPrices.includes(action.type) || !selectSelectedListId(state)) return state

  const formatted = selectAllDudeIdsForList(state, selectSelectedListId(state))
    .reduce((acc, dudeId) => {
      acc[dudeId] = selectItemIdsForDude(state, dudeId)
        .reduce((prices, itemId) => {
          prices[itemId] = selectItemPrice(state, itemId)
          return prices
        }, {})
      return acc
    }, {})

  const updated = clone(state)
  updated.settleUp = SettleUp(formatted)

  return updated
}
