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


function TransitionComponent(props) {
  // Moves state to the next page
  return (
    <button className={(props.className!== undefined ? props.className+" " : "") + "transitionButton"} onClick={(e) => props.onChange(props.toNum)}>
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
      <QuestionTitle title="Would you like to see how much money you've made today?" />

      <div className="spacer height25"></div>

      <div className="centerContainer">
        <TransitionComponent
          content="Yes"
          toNum={Q1_PAGE}
          onChange={props.onChange}
        />
        &nbsp;
        <TransitionComponent
          content="Absolutely"
          toNum={Q1_PAGE}
          onChange={props.onChange}
        />
        &nbsp;
        <TransitionComponent
          content="Why Not???"
          toNum={Q1_PAGE}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}


function Page1(props) {
  return (
    <div>
      <QuestionTitle title="Q1 (Dollars per hour?)" />

      <div className="centerContainer">
        <div className="spacer height30"></div>

        Enter dollars per hour:&nbsp;<input type="number" className="dollarPicker" min="0" value={props.state.dollarsPerHour} onChange={
          (e) => props.stateFunction({dollarsPerHour: parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 0})
        } />

        <div className="spacer height30"></div>

        <TransitionComponent content="CONTINUE" toNum={Q2_PAGE} onChange={props.onChange} />
        &nbsp;
        <TransitionComponent content="BACK" toNum={FRONT_PAGE} onChange={props.onChange} />
      </div>
    </div>
  );
}

function Page2(props) {
  return (
    <div>
      <QuestionTitle title="What time did you start working?" />

      <div className="centerContainer">
        <div className="spacer height30"></div>

        <TimePicker stateFunction={props.stateFunction} state={props.state} />

        <div className="spacer height30"></div>

        <TransitionComponent content="CONTINUE" toNum={FINAL_PAGE} onChange={props.onChange} />
        &nbsp;
        <TransitionComponent content="BACK" toNum={Q1_PAGE} onChange={props.onChange} />
      </div>
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
        <div className="centerContainer">

          <div className="spacer height50"></div>

          <CurrencyDisplay amount={this.state.amountMade}/>

          <div className="spacer height30"></div>

          <TransitionComponent
            content="RESTART"
            toNum={FRONT_PAGE}
            onChange={(e) => {
              this.props.onChange(e);
              this.props.resetFunction();
            }}
          />
        </div>
      </div>
    );
  }
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
      return <StartPage onChange={props.onChange} stateFunction={props.stateFunction} state={props.state} />;

    case Q1_PAGE:
      return <Page1 onChange={props.onChange} stateFunction={props.stateFunction} state={props.state} />;

    case Q2_PAGE:
      return <Page2 onChange={props.onChange} stateFunction={props.stateFunction} state={props.state} />;

    case FINAL_PAGE:
      const timeStarted = new Date();
      const newHours = (props.state.timeStartedHour +
        (props.state.timeStartedAmPm === "am" ? 0 : 12)) % 24;
      timeStarted.setHours(newHours, props.state.timeStartedMinute, 0, 0);

      return (
        <FinalPage
          onChange={props.onChange}
          stateFunction={props.stateFunction}
          resetFunction={props.resetFunction}
          dollarsPerHour={props.state.dollarsPerHour}
          timeStarted={timeStarted}
          state={props.state}
        />
      );

    default:
      return <DefaultPage />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizPageNumber: 0,
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
        <Page
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
