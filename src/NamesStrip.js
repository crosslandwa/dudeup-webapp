import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameBadge from './NameBadge'
import { selectAllDudeIds } from './dudes/selectors'
import { addDude } from './dudes/actions'
import { black, overcast } from './colours'

const styles = {
  display: 'flex',
  width: '100%',
  minHeight: 62,
  justifyContent: 'space-around',
  height: '100%',
  borderRadius: 5,
  backgroundColor: overcast,
  alignItems: 'center'
}

const nameListStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const addButtonStyle = {
  background: 'none',
  border: 'none',
  font: 'inherit',
  cursor: 'pointer',
  width: '15%',
  height: '30px',
  fontSize: 'inherit',
  marginLeft: '2%',
  borderRadius: 5
}

class NamesStrip extends Component {
  render() {
    return (
        <div style={styles} >
        <input style={addButtonStyle}
          type="button"
          value="Add dude:"
          onClick={this.props.addDude}
        />
        <div style={nameListStyle}>
          {this.props.ids.map(dudeId => (
            <NameBadge key={dudeId} dudeId={dudeId} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ids: selectAllDudeIds(state),
})

const mapDispatchToProps = { addDude }

export default connect(mapStateToProps, mapDispatchToProps)(NamesStrip)
