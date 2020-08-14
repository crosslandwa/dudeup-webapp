import React from 'react'
import { connect } from 'react-redux'
import { clear } from './interactions'
import Accordian from '../Accordian'
import { addNotification } from '../Notifications/interactions'

class Clear extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showClear: false }

    this.openClear = (e) => {
      e && e.preventDefault()
      this.setState({ showClear: true })
    }

    this.closeAccordian = () => {
      this.setState({ showClear: false })
    }

    this.clear = () => {
      this.props.clear()
      this.props.addNotification('All Dudes and Items have been cleared')
      this.closeAccordian()
    }
  }

  render () {
    return (
      <>
        <button class={`du-button du-button--flyout ${this.state.showClear ? 'du-flyout--below' : ''}`} onClick={this.openClear}>
          <span class="du-button__label">Clear</span>
        </button>
        {this.state.showClear && (
          <div class="du-full-width-container__outer">
            <div class="du-full-width-container__inner">
              <Accordian overlay="true" closeExplicit={this.closeAccordian} closeImplicit={this.closeAccordian} onSubmit={this.clear} title="Clear">
                <div class="du-info-text">Clearing will remove all Dudes and Items from your device. Click the Clear button to proceed</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
                  <button class="du-button du-button--delete" type="submit">Clear</button>
                  <button autoFocus class="du-button" type="button" onClick={this.closeAccordian}>Cancel</button>
                </div>
                <span><em>This can not be undone</em></span>
              </Accordian>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default connect(null, { addNotification, clear })(Clear)
