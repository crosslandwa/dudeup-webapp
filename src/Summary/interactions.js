import { dudeIdsSelector } from '../DudeList/interactions'
import { itemIdsBoughtByDudeSelector, itemPriceSelector, itemCostSplittingSelector } from '../ItemList/interactions'
import DudeUp from 'dudeup'

const apply = (f, x) => f(x)

// ------SELECTORS------

export const dudesInDebtSummarySelector = state => {
  const summary = DudeUp(dudeIdsSelector(state)
    .reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsBoughtByDudeSelector(state, dudeId).map(itemId => apply(
        costSplit => apply(
          sharingDudeIds => sharingDudeIds.length
            ? sharingDudeIds.map(sharingDudeId => ({ amount: costSplit[sharingDudeId], dudes: [sharingDudeId] }))
            : [{ amount: itemPriceSelector(state, itemId) }],
          Object.keys(costSplit)
        ),
        itemCostSplittingSelector(state, itemId)
      )).reduce((acc, it) => acc.concat(it), [])
    }), {}))
  const dudeIds = dudeIdsSelector(state)

  return {
    dudeIds,
    debts: dudeIds.reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: Object.keys(summary.amountOwedByGroupMember[dudeId])
        .map(owesToDudeId => ({
          dudeId: owesToDudeId,
          amount: summary.amountOwedByGroupMember[dudeId][owesToDudeId]
        }))
    }), {}),
    groupTotal: summary.groupTotal,
    spentAmounts: summary.totalPaidPerGroupMember,
    spentOnAmounts: summary.totalSpentOnGroupMember
  }
}
