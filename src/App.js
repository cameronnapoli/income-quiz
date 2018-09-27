// Written by: Cameron Napoli

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimePicker from './resources/TimePicker';
import QuestionTitle from './resources/QuestionTitle';

import './App.css';


const FRONT_PAGE = 0;
const Q1_PAGE = 1;
const Q2_PAGE = 2;
const FINAL_PAGE = 3;
const Q4_PAGE = 4;


function TransitionComponent(props) {
  // Moves state to the next page
  return (
    <button className="transitionButton" onClick={(e) => props.onChange(props.toNum)}>
      {props.content}
    </button>
  );
}
TransitionComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  toNum: PropTypes.number,
  content: PropTypes.string
};


function StartPage(props) {
  return (
    <div>
      <QuestionTitle title="See how much money you've made today?" />

      <TransitionComponent content="Yes" toNum={Q1_PAGE} onChange={props.onChange} />
      <TransitionComponent content="No" toNum={Q4_PAGE} onChange={props.onChange} />
    </div>
  );
}


function Page1(props) {
  return (
    <div>
      <QuestionTitle title="Q1 (Dollars per hour?)" />

      <input type="number" onChange={
        (e) => props.stateFunction({dollarsPerHour: parseInt(e.target.value, 10)})
      } />

      <TransitionComponent content="CHECK" toNum={Q2_PAGE} onChange={props.onChange} />
      <TransitionComponent content="BACK" toNum={FRONT_PAGE} onChange={props.onChange} />
    </div>
  );
}

function Page2(props) {
  return (
    <div>
      <QuestionTitle title="Q2 (Time you started?)" />

      <TimePicker stateFunction={props.stateFunction} />

      <TransitionComponent content="CHECK" toNum={FINAL_PAGE} onChange={props.onChange} />
      <TransitionComponent content="BACK" toNum={Q1_PAGE} onChange={props.onChange} />
    </div>
  );
}


class CurrencyDisplay extends Component {
  render() {
    return (
      <div className="dollarsMade">${this.props.amount}</div>
    );
  }
}

class FinalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountMade: null
    };
  }

  updateAmountMade() {
    const amountMade = this.calculateAmountMade(
        this.props.timeStarted, new Date(), this.props.dollarsPerHour
    );
    this.setState({
      amountMade: amountMade
    });
  }

  tick() {
    this.updateAmountMade();
  }

  componentDidMount() {
    this.updateAmountMade();
    this.timerID = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  calculateAmountMade(startDate, endDate, dollarsPerHour) {
    /* startDate      : Date object
       endDate        : Date object
         If startDate is after endDate, throw error
         If startDate and endDate are not on the same day, throw error
       dollarsPerHour : number
         return amount made in US Dollars.
    */
    const diffMillis = endDate - startDate;
    if (diffMillis < 0) {
      throw new Error("calculateAmountMade() startDate needs to be before endDate");
    }
    if (startDate.getYear()  !== endDate.getYear() ||
        startDate.getMonth() !== endDate.getMonth() ||
        startDate.getDay()   !== endDate.getDay()) {
      throw new Error("startDate: " + startDate + ", and endDate: "
        + endDate + " need to be on the same day");
    }
    return ((diffMillis / (1000*3600)) * dollarsPerHour).toFixed(4);
  }

  render() {
    return (
      <div>
        <QuestionTitle title="You've made:" />
        <CurrencyDisplay amount={this.state.amountMade}/>
        <TransitionComponent
          content="Restart"
          toNum={FRONT_PAGE}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

function Page4(props) {
  return (
    <div>
      <QuestionTitle title="Why don't you want to take the quiz??? Sad..." />
      <TransitionComponent
        content="BACK"
        toNum={FRONT_PAGE}
        onChange={props.onChange}
      />
    </div>
  );
}

function DefaultPage(props) {
  return (
    <div>
      Oops! Looks like you clicked a link that doesn&#39;t go anywhere.<br />
      Please refresh the page.
    </div>
  );
}


function Page(props) {
  switch (props.quizPageNumber) {
    case FRONT_PAGE:
      return <StartPage onChange={props.onChange} stateFunction={props.stateFunction} />;

    case Q1_PAGE:
      return <Page1 onChange={props.onChange} stateFunction={props.stateFunction} />;

    case Q2_PAGE:
      return <Page2 onChange={props.onChange} stateFunction={props.stateFunction} />;

    case FINAL_PAGE:
      const timeStarted = new Date();
      const newHours = (props.state.timeStartedHour +
        (props.state.timeStartedAmPm === "am" ? 0 : 12)) % 24;
      timeStarted.setHours(newHours, props.state.timeStartedMinute, 0, 0);

      return (
        <FinalPage
          onChange={props.onChange}
          stateFunction={props.stateFunction}
          dollarsPerHour={props.state.dollarsPerHour}
          timeStarted={timeStarted}
        />
      );

    case Q4_PAGE:
      return <Page4 onChange={props.onChange} stateFunction={props.stateFunction} />;

    default:
      return <DefaultPage />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizFinished: false,
      quizPageNumber: 0,
      dollarsPerHour: null,
      timeStartedHour: null,
      timeStartedMinute: null,
      timeStartedAmPm: "am"
    };

    this.changePage = this.changePage.bind(this);
    this.alterState = this.alterState.bind(this);
  }

  changePage(toPageNumber) {
    this.setState({
      quizPageNumber: toPageNumber
    });
  }

  alterState(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <div className="app">
        <Page
          quizPageNumber={this.state.quizPageNumber}
          onChange={this.changePage}
          stateFunction={this.alterState}
          state={this.state}
        />
      </div>
    );
  }
}

export default App;
