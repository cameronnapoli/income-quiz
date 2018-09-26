import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimePicker from './resources/TimePicker';
import QuestionTitle from './resources/QuestionTitle';

import './App.css';


function TransitionComponent(props) {
  // Points to the next page
  return (
    <button className="transitionButton" onClick={(e) => props.onChange(props.toNum)}>
      {props.content}
    </button>
  );
}
TransitionComponent.propTypes = {
  onChange: PropTypes.func,
  toNum: PropTypes.number,
  content: PropTypes.string
};


function Page0(props) {
  return (
    <div>
      <QuestionTitle title="See how much money you've made today?" />

      <TransitionComponent content="Yes" toNum={1} onChange={props.onChange} />
      <TransitionComponent content="No" toNum={4} onChange={props.onChange} />
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

      <TransitionComponent content="CHECK" toNum={2} onChange={props.onChange} />
      <TransitionComponent content="BACK" toNum={0} onChange={props.onChange} />
    </div>
  );
}

function Page2(props) {
  return (
    <div>
      <QuestionTitle title="Q2 (Time you started?)" />

      <TimePicker stateFunction={props.stateFunction} />

      <TransitionComponent content="CHECK" toNum={3} onChange={props.onChange} />
      <TransitionComponent content="BACK" toNum={1} onChange={props.onChange} />
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
    console.log("tick");
    this.updateAmountMade();
  }

  componentDidMount() {
    this.updateAmountMade();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  roundTo4Decimals(num) {
    return num.toFixed(4);
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
    return this.roundTo4Decimals((diffMillis / (1000*3600)) * dollarsPerHour);
  }

  render() {
    return (
      <div>
        <QuestionTitle title="You've made:" />

        <CurrencyDisplay amount={this.state.amountMade}/>

        <TransitionComponent
          content="Restart"
          toNum={0}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

function Page4(props) {
  return (
    <div>
      <QuestionTitle title="You're a loser." />
      <TransitionComponent
        content="BACK"
        toNum={0}
        onChange={props.onChange}
      />
    </div>
  );
}


function Page(props) {
  switch (props.quizPageNumber) {
    case 0:
      return <Page0 onChange={props.onChange} stateFunction={props.stateFunction} />;
    case 1:
      return <Page1 onChange={props.onChange} stateFunction={props.stateFunction} />;
    case 2:
      return <Page2 onChange={props.onChange} stateFunction={props.stateFunction} />;
    case 3:
      const dollarsPerHour = props.state.dollarsPerHour;

      const timeStarted = new Date();
      const newHours = (props.state.timeStartedHour +
        (props.state.timeStartedAmPm === "am" ? 0 : 12)) % 24;
      timeStarted.setHours(newHours, props.state.timeStartedMinute, 0, 0);

      return (
        <FinalPage
          onChange={props.onChange}
          stateFunction={props.stateFunction}
          dollarsPerHour={dollarsPerHour}
          timeStarted={timeStarted}
        />
      );
    case 4:
      return <Page4 onChange={props.onChange} stateFunction={props.stateFunction} />;
    default:
      return (
        <div>
          Oops! Looks like you clicked a link that doesn&#39;t go anywhere.
          Please refresh the page.
        </div>
      );
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
