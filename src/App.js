import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import NamesStrip from './NamesStrip'
import GroupSummary from './GroupSummary'
import ItemList from './ItemList'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Dude Up</h2>
        </div>
        <div className="App-group">
          <NamesStrip />
          <GroupSummary />
        </div>
        <div className="App-group">
          <ItemList />
        </div>
      </div>
    )
  }
}

export default App
