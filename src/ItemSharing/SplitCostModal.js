import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {
  itemCostSplitSelector, itemSharedByDudeIdsSelector, shareItemBetweenDudes, splitItemBetweenDudes,
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector,
  itemPriceSelector,
  isItemExplicitlySplitSelector
} from '../ItemList/interactions'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import PriceInput from '../GenericUi/PriceInput'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { itemId }) => ({
  allDudeIds: dudeIdsSelector(state),
  dudeName: apply(
    dudeId => dudeId ? dudeNameSelector(state, dudeId) : 'some dude',
    itemBoughtByDudeIdSelector(state, itemId)
  ),
  isEqualSplit: !isItemExplicitlySplitSelector(state, itemId),
  itemDescription: itemDescriptionSelector(state, itemId) || 'Unnamed item',
  itemSharedByDudeIds: itemSharedByDudeIdsSelector(state, itemId),
  price: itemPriceSelector(state, itemId),
  costSplitting: itemCostSplitSelector(state, itemId)
})

const mapDudeIdToName = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const CheckBox = ({ id, label, onChange, selected }) => (
  <label>
    {label}
    <input type="checkbox" value={id} checked={selected} onChange={onChange} />
  </label>
)
const CheckBoxOption = connect(mapDudeIdToName)(props => (
  <CheckBox {...props} label={props.name} />
))

const AmountInputOption = connect(mapDudeIdToName)(props => (
  <label>{props.name}<PriceInput {...props} /></label>
))

class SplitCostModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEqualSplit: props.isEqualSplit,
      selectedIds: props.itemSharedByDudeIds,
      individualAmounts: props.costSplitting
    }
    this.updateIndividualAmount = (dudeId, amount) => {
      this.setState((state, props) => ({
        individualAmounts: { ...state.individualAmounts, [dudeId]: parseFloat(amount || 0) }
      }))
    }
    this.toggleDudesInvolvement = (dudeId, checked) => {
      this.setState((state, props) => ({
        selectedIds: checked
          ? [...new Set(state.selectedIds.concat(dudeId))]
          : state.selectedIds.filter(id => id !== dudeId)
      }))
    }
    this.shareByEveryone = () => {
      this.setState({ selectedIds: [] })
    }
    this.setEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isEqualSplit: true })
      }
    }
    this.setNonEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isEqualSplit: false })
      }
    }
    this.submit = () => {
      if (this.state.isEqualSplit) {
        this.props.shareItemBetweenDudes(this.props.itemId, this.state.selectedIds)
      } else {
        this.props.splitItemBetweenDudes(
          this.props.itemId,
          Object.keys(this.state.individualAmounts)
            .map(dudeId => ({ dudeId, amount: this.state.individualAmounts[dudeId] }))
            .filter(({ amount }) => amount > 0)
            .reduce((acc, { dudeId, amount }) => ({ ...acc, [dudeId]: amount }), {})
        )
      }
      this.props.closeModal()
    }
    this.splitTotal = () => Object.keys(this.state.individualAmounts)
      .map(dudeId => this.state.individualAmounts[dudeId])
      .filter(x => x)
      .reduce((a, b) => a + b, 0)
  }

  render () {
    const { allDudeIds, closeModal, dudeName, itemDescription, price } = this.props
    return (
      <Modal onCancel={closeModal} onSubmit={this.submit} submitButtonText="Update" title={itemDescription} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span>Bought by <em>{dudeName}</em> for {price}</span>
          <div>
            <label>
              Shared by
              <input autoFocus={this.state.isEqualSplit} type="radio" checked={this.state.isEqualSplit} onChange={this.setEqualSplit} />
            </label>
            <label>
              Split between
              <input autoFocus={!this.state.isEqualSplit} type="radio" checked={!this.state.isEqualSplit} onChange={this.setNonEqualSplit} />
            </label>
          </div>
          <div>
            {allDudeIds.map(id => (
              <div>
                {this.state.isEqualSplit
                  ? <CheckBoxOption id={id} selected={this.state.selectedIds.includes(id)} onChange={e => this.toggleDudesInvolvement(id, e.target.checked)}/>
                  : <AmountInputOption id={id} price={this.state.individualAmounts[id]} onChange={e => this.updateIndividualAmount(id, e.target.value)} />
                }
              </div>
            ))}
            {this.state.isEqualSplit && (
              <div><CheckBox id="_everyone_" label="Everyone" onChange={this.shareByEveryone} selected={!this.state.selectedIds.length} /></div>
            )}
            {!this.state.isEqualSplit && (
              <div>You have {price - this.splitTotal()} left to divvy up</div>
            )}
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, { shareItemBetweenDudes, splitItemBetweenDudes })(SplitCostModal)
