import createStore from '../../store'
import { addDude, removeDude, dudeCanBeRemovedSelector, dudeIdsSelector, dudeNameSelector, updateDudeName, lastAddedDudeSelector } from '../interactions'

import { updateItem } from '../../ItemList/interactions'
import { addItemAndReturnId } from '../../ItemList/__tests__/ItemListTest.js'

export const addDudeAndReturnId = (store, name) => {
  store.dispatch(addDude(name))
  return lastAddedDudeSelector(store.getState())
}

describe('Dude List', () => {
  it('can have Dudes added', () => {
    const store = createStore()

    expect(dudeIdsSelector(store.getState())).toHaveLength(0)

    store.dispatch(addDude('person 1'))
    store.dispatch(addDude('person 2'))

    const dudeIds = dudeIdsSelector(store.getState())

    expect(dudeIds).toHaveLength(2)

    const lastAddedId = lastAddedDudeSelector(store.getState())
    expect(dudeNameSelector(store.getState(), lastAddedId)).toEqual('person 2')
  })

  it('can have Dudes removed', () => {
    const store = createStore()

    store.dispatch(addDude('person 1'))

    const dudeId = lastAddedDudeSelector(store.getState())

    store.dispatch(removeDude(dudeId))

    expect(dudeIdsSelector(store.getState())).toHaveLength(0)
  })

  it('allows Dudes names to be changed', () => {
    const store = createStore()
    const dudeId = addDudeAndReturnId(store, 'person 1')

    store.dispatch(updateDudeName(dudeId, 'updated name'))

    expect(dudeNameSelector(store.getState(), dudeId)).toEqual('updated name')
  })

  it('does not allow dudes who have bought items to be removed', () => {
    const store = createStore()
    const dudeId = addDudeAndReturnId(store, 'person 1')

    expect(dudeCanBeRemovedSelector(store.getState(), dudeId)).toEqual(true)

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItem(itemId, 'an item', dudeId, 100))

    expect(dudeCanBeRemovedSelector(store.getState(), dudeId)).toEqual(false)
  })

  it('does not allow dudes who are sharing items to be removed', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'person 1')
    const dudeId2 = addDudeAndReturnId(store, 'person 2')

    expect(dudeCanBeRemovedSelector(store.getState(), dudeId2)).toEqual(true)

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItem(itemId, 'an item', dudeId1, 1.99, [{ dudeId: dudeId1 }, { dudeId: dudeId2 }]))

    expect(dudeCanBeRemovedSelector(store.getState(), dudeId2)).toEqual(false)
  })
})
