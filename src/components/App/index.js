import React, { Component } from 'react';
import Main from '../Main';
import logo from '../../assets/logo.svg';
import './App.sass';
import 'whatwg-fetch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TV Series List</h1>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
