import React from 'react'
import { highlightColor, textButtonStyle } from '../styles'

const AddIcon = ({ highlight }) => (
  <span style={{
    background: highlight ? highlightColor : '',
    borderRadius: '50%',
    height: '1.25em',
    width: '1.25em',
    lineHeight: '1.25em',
    textAlign: 'center'
  }}>+</span>
)

class AddButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hover: false
    }

    this.onHover = () => {
      this.setState({ hover: true })
    }

    this.endHover = () => {
      this.setState({ hover: false })
    }

    this.captureRef = node => {
      this.ref = node
    }

    this.focus = () => {
      this.ref.focus()
    }
  }

  render () {
    const { label, onClick } = this.props
    const highlight = this.props.highlight || this.state.hover

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={onClick}
        onMouseEnter={this.onHover}
        onMouseLeave={this.endHover}
      >
        <AddIcon highlight={highlight} />
        <input
          style={{
            ...textButtonStyle,
            color: highlight ? highlightColor : '',
            border: 'none',
            padding: '0.2em 0.5em 0.2em 1.3em',
            marginLeft: '-1.25em',
            textAlign: 'left',
            minWidth: '',
            background: 'none'
          }}
          type="button"
          value={label}
          ref={this.captureRef}
        />
      </div>
    )
  }
}

export default AddButton
