import {
  closeModal as closeModalGeneric,
  openModal as openModalGeneric,
  isModalOpenSelector as isModalOpenGeneric
} from '../Modal/interactions'

export const ADD_DUDE_MODAL_ID = 'add-dude-modal'

// ------ACTIONS------
export const openModal = () => openModalGeneric(ADD_DUDE_MODAL_ID)
export const closeModal = closeModalGeneric

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, ADD_DUDE_MODAL_ID)
