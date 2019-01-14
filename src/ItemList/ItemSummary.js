import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector, itemPriceSelector,
  itemSharingLabelSelector
} from './interactions'
import { dudeNameSelector } from '../DudeList/interactions'
import EditItemAccordian from './EditItemAccordian'
import Dividor from '../GenericUi/Dividor'
import { secondaryTextItalic } from '../styles'
import FocusableDiv from '../GenericUi/FocusableDiv'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id),
  dude: apply(
    dudeId => dudeId ? dudeNameSelector(state, dudeId) : '',
    itemBoughtByDudeIdSelector(state, id)
  ),
  price: itemPriceSelector(state, id),
  sharingLabel: itemSharingLabelSelector(state, id)
})

class ItemSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { edit: false, reFocus: false }

    this.toggleEdit = e => {
      this.setState(state => ({ edit: !state.edit }))
    }

    this.captureRef = node => {
      this.ref = node
    }

    this.closeEdit = (reFocus = false) => {
      this.setState({ edit: false, reFocus })
    }

    this.closeEditAndRefocus = () => {
      this.closeEdit(true)
    }
  }

  componentDidUpdate () {
    if (this.ref && this.state.reFocus) {
      this.setState(state => {
        this.ref.focus()
        return { reFocus: false }
      })
    }
  }

  render () {
    const { description, dude, id, price, sharingLabel } = this.props
    return (
      <div>
        {this.state.edit
          ? (
            <EditItemAccordian id={id} closeExplicit={this.closeEditAndRefocus} closeImplicit={this.closeEdit} />
          ) : (
            <FocusableDiv ref={this.captureRef} style={{ cursor: 'pointer' }} onClick={this.toggleEdit}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  {description}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '5em'
                }}>
                  <span>{price.toFixed(2)}</span>
                  <span style={secondaryTextItalic}>{dude || '???'}</span>
                </div>
              </div>
              {sharingLabel && (
                <div style={{ ...secondaryTextItalic, marginTop: '0.5em', textAlign: 'center' }}>{sharingLabel}</div>
              )}
            </FocusableDiv>
          )}
        <Dividor withTopMargin={true} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemSummary)
