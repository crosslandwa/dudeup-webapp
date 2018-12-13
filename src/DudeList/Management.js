import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector } from './interactions'
import { textButtonStyle } from '../styles'
import EditableDude from './EditableDude'
import AddDudeAccordian from './AddDudeAccordian'
import { flyoutHighlight, WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = (state) => ({
  dudeIds: dudeIdsSelector(state)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }

    this.toggleAddDude = e => {
      this.setState(state => ({ modalOpen: !state.modalOpen }))
    }
  }

  render () {
    return (
      <div style={{ marginBottom: '1em' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {this.props.dudeIds.map(id => <EditableDude id={id} />)}
        </div>
        <WithFlyoutArrowBelow show={this.state.modalOpen} >
          <input style={{ ...textButtonStyle, ...(this.state.modalOpen ? flyoutHighlight : {}), display: 'block' }} type="button" onClick={this.toggleAddDude} value="Add dude" />
        </WithFlyoutArrowBelow>
        {this.state.modalOpen && (
          <AddDudeAccordian close={this.closeModal} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)