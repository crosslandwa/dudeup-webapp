import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDudesName } from './selectors'
import { selectDude, updateDudeName } from './actions'
import { dusty, lavender } from '../colours'

const styles = (selected) => ({
  height: 48,
  minWidth: 60,
  maxWidth: 100,
  backgroundColor: selected ? dusty : lavender,
  borderRadius: 5,
  borderStyle: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 4px',
  font: 'inherit',
  textAlign: 'center'
})

class NameBadge extends Component {
  render() {
    return (
      <input
        style={styles(this.props.selected)}
        type="text"
        value={this.props.name}
        onChange={this.props.updateName}
        onClick={this.props.select}
        placeholder="Name..."
        onKeyPress={this.props.enter}
      />
    )
  }
}

const mapStateToProps = (state, { dudeId }) => ({
  name: selectDudesName(state, dudeId)
})

const mapDispatchToProps = (dispatch, { dudeId }) => ({
  enter: event => { if (event.key === 'Enter') dispatch(selectDude(dudeId)) },
  select: () => dispatch(selectDude(dudeId)),
  updateName: (event) => dispatch(updateDudeName(dudeId, event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NameBadge)
