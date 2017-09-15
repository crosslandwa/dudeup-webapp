import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameBadge from './NameBadge'
import { selectAllDudeIds } from './dudes/selectors'
import { addDude } from './dudes/actions'

const styles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
  height: '100%',
  padding: '2% 0',
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#333333',
  backgroundColor: '#5df580',
  alignItems: 'center'
}

const nameListStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '0 2%',
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
  marginLeft: '2%'
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
