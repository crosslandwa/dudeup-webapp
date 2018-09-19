import React from 'react'
import { connect } from 'react-redux'
import ItemList from './ItemList'
import DudeManagement from './DudeManagement'
import AddDudeModal from './AddDudeModal'
import Summary from './Summary'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

const App = props => (
  <div style={{
    fontFamily: 'sans-serif'
  }}>
    <AddDudeModal />
    <DudeManagement />
    <ItemList />
    <Summary />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
