import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'

const mapStateToProps = (state, { itemId }) => ({
  allDudeIds: dudeIdsSelector(state)
})

const mapDudeIdToName = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const CheckBox = ({ id, label, onChange, selected }) => (
  <label>
    <input type="checkbox" value={id} checked={selected} onChange={onChange} />
    <span>{label}</span>
  </label>
)
const CheckBoxOption = connect(mapDudeIdToName)(props => (
  <CheckBox {...props} label={props.name} />
))

const ItemSharing = ({ allDudeIds, selectedIds, shareByEveryone, toggleDudesInvolvement }) => (
  <>
    {allDudeIds.map(id => (
      <CheckBoxOption id={id} selected={selectedIds.includes(id)} onChange={e => toggleDudesInvolvement(id, e.target.checked)}/>
    ))}
    <CheckBox id="_everyone_" label={<strong>Everyone</strong>} onChange={shareByEveryone} selected={!selectedIds.length} />
  </>
)

export default connect(mapStateToProps)(ItemSharing)
