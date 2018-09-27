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
          <h1 className="App-title"><span>TV</span>Series</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
