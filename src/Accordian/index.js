import React from 'react'
import { connect } from 'react-redux'
import ClosingCross from './ClosingCross'
import { highlightColor } from '../styles'

const mapDispatchToProps = (dispatch, { onSubmit }) => ({
  onSubmit: event => {
    event.preventDefault()
    onSubmit()
  }
})

class Accordian extends React.Component {
  constructor (props) {
    super(props)

    this.escFunction = event => {
      if (event.keyCode === 27) {
        this.props.closeExplicit()
      }
    }

    this.captureRef = node => {
      this.ref = node
    }

    this.closeIfFocusLost = blurEvent => {
      const targetElement = blurEvent.relatedTarget
      if ((targetElement === null) || (this.ref && !this.ref.contains(targetElement))) {
        this.props.closeImplicit()
      }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  render () {
    return (
      <div ref={this.captureRef} style={{
        boxShadow: `inset 0 0 0.1em 0.25em ${highlightColor}`,
        padding: '0.5em',
        marginBottom: '0.5em'
      }}>
        <ClosingCross onClick={this.props.closeExplicit} />
        <h3 style={{ margin: '0 0 0.5em 0', maxWidth: 'calc(100% - 2em)' }}>{this.props.title}</h3>
        <form onBlur={this.closeIfFocusLost} onSubmit={this.props.onSubmit} >
          {this.props.children}
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Accordian)
