import React, { Component } from 'react';
import Main from '../Main';
import './App.sass';
import 'whatwg-fetch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><span>TV</span>Series</h1>
        </header>
        <Main />
        <div className="caption">
          <h3>Here you can find all of your most loved series</h3>
        </div>
      </div>
    );
  }
}

export default App;
