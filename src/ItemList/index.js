import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import Item from './Item'
import { textButtonStyle } from '../styles'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

const ItemList = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div>
      {props.ids.map(id => <Item id={id} />)}
    </div>
    <div>
      <input style={textButtonStyle} type="button" onClick={props.addItem} value="Add item" />
    </div>
  </div>
)

export default connect(mapStateToProps, { addItem })(ItemList)
