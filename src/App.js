// Written by: Cameron Napoli

import React, {Component} from 'react';

import PageController from './components/PageController';
import {FRONT_PAGE} from './components/constants';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizPageNumber: FRONT_PAGE,
      dollarsPerHour: 10,
      timeStartedHour: 9,
      timeStartedMinute: 0,
      timeStartedAmPm: "am"
    };

    this.changePage = this.changePage.bind(this);
    this.alterState = this.alterState.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  changePage(toPageNumber) {
    this.setState({
      quizPageNumber: toPageNumber
    });
  }

  alterState(newState) {
    this.setState(newState);
  }

  resetState() {
    this.setState({
      dollarsPerHour: 0,
      timeStartedHour: 1,
      timeStartedMinute: 0,
      timeStartedAmPm: "am"
    });
  }

  render() {
    return (
      <div className="app">
        <PageController
          quizPageNumber={this.state.quizPageNumber}
          onChange={this.changePage}
          stateFunction={this.alterState}
          state={this.state}
          resetFunction={this.resetState}
        />
      </div>
    );
  }
}

export default App;
