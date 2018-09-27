import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { CheckBoxList as DudeList } from '../DudeList'
import { closeModal } from './interactions'
import {
  updateItemIsUnequalSplit, itemIsUnequalSplitSelector,
  itemDescriptionSelector,
  itemDudeSelector,
  updateItemSharedByDudes, itemSharedByDudeIdsSelector
} from '../ItemList/interactions'
import { dudeNameSelector } from '../DudeList/interactions'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { itemId }) => ({
  isNonEqualSplit: itemIsUnequalSplitSelector(state, itemId),
  itemDescription: itemDescriptionSelector(state, itemId),
  dudeName: apply(dudeId => dudeId && dudeNameSelector(state, dudeId), itemDudeSelector(state, itemId)),
  selectedIds: itemSharedByDudeIdsSelector(state, itemId)
})
const mapDispatchToProps = (dispatch, { itemId }) => ({
  updateItemSharedByDudes: dudeIds => dispatch(updateItemSharedByDudes(itemId, dudeIds)),
  updateUnequalSplit: isUnequal => dispatch(updateItemIsUnequalSplit(itemId, isUnequal)),
  closeModal: () => dispatch(closeModal())
})

class CostSplitter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isNonEqualSplit: props.isNonEqualSplit,
      selectedIds: props.selectedIds
    }
    this.toggleDudesInvolvement = (dudeId, checked) => {
      this.setState((state, props) => ({
        selectedIds: checked
          ? [...new Set(state.selectedIds.concat(dudeId))]
          : state.selectedIds.filter(id => id !== dudeId)
      }))
    }
    this.setEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isNonEqualSplit: false })
      }
    }
    this.setNonEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isNonEqualSplit: true })
      }
    }
    this.submit = () => {
      if (this.state.selectedIds.length) {
        this.props.updateUnequalSplit(this.state.isNonEqualSplit)
        this.props.updateItemSharedByDudes(this.state.selectedIds)
        this.props.closeModal()
      } else {
        this.setState({ warning: 'Warning - you need to select at least one dude' })
      }
    }
  }

  render () {
    return (
      <Modal onSubmit={this.submit} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {this.state.warning && <span>{this.state.warning}</span>}
          <span>
            Sharing cost for "{this.props.itemDescription || <em>a mystery item</em>}" bought by {this.props.dudeName || <em>some dude</em>}
          </span>
          <div>
            <label>
              Split equally between
              <input type="radio" checked={!this.state.isNonEqualSplit} onChange={this.setEqualSplit} />
            </label>
            <label>
              Split unequally between
              <input type="radio" checked={this.state.isNonEqualSplit} onChange={this.setNonEqualSplit} />
            </label>
          </div>
          <DudeList selectedIds={this.state.selectedIds} onChange={this.toggleDudesInvolvement}/>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CostSplitter)
