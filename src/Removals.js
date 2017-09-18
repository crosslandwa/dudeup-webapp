import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectListName } from './lists/selectors'
import { selectDudesName } from './dudes/selectors'
import { removeDude } from './dudes/actions'
import { removeList } from './lists/actions'
import { black, dusty, overcast, paper } from './colours'

const styles = {
  display: 'flex',
  width: '95%',
  padding: '2.5% 2.5%',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const buttonStyleDisabled = {
  background: overcast,
  color: paper,
  border: 'solid 1px',
  font: 'inherit',
  marginLeft: '1%',
  height: '30px',
  fontSize: 'inherit',
  borderRadius: 5,
  width: '30%'
}

const buttonStyleEnabled = {
  ...buttonStyleDisabled,
  background: 'none',
  color: black,
  cursor: 'pointer',
}

class Removals extends Component {
  render() {
    return (
      <div style={styles} >
        <input style={!!this.props.selectedDudeId ? buttonStyleEnabled : buttonStyleDisabled}
          type="button"
          value={`Delete ${this.props.selectedDudeName}`}
          onClick={!this.props.selectedDudeId ? null : this.props.removeDude}
          // onKeyPress={this.props.enter}
        />
        <input style={!!this.props.selectedListId ? buttonStyleEnabled : buttonStyleDisabled}
          type="button"
          value={`Delete ${this.props.selectedListName}`}
          onClick={!this.props.selectedListId ? null : this.props.removeList}
          // onKeyPress={this.props.enter}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, { selectedDudeId, selectedListId }) => ({
  selectedDudeName: selectedDudeId ? selectDudesName(state, selectedDudeId) : 'Dude',
  selectedListName: selectedListId ? selectListName(state, selectedListId) : 'List'
})

const mapDispatchToProps = (dispatch, { selectedDudeId, selectedListId }) => ({
  removeDude: () => dispatch(removeDude(selectedDudeId)),
  removeList: () => dispatch(removeList(selectedListId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Removals)
