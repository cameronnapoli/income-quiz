import React, {Component} from 'react';

import QuestionTitle from './QuestionTitle';
import TransitionComponent from './TransitionComponent';
import {FRONT_PAGE} from './constants';

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
    if (startDate.getYear() !== endDate.getYear() ||
      startDate.getMonth() !== endDate.getMonth() ||
      startDate.getDay() !== endDate.getDay()) {
      throw new Error("startDate: " + startDate + ", and endDate: "
        + endDate + " need to be on the same day");
    }
    return ((diffMillis / (1000 * 3600)) * dollarsPerHour).toFixed(4);
  }

  render() {
    return (
      <div>
        <QuestionTitle title="You've made:"/>
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

export default FinalPage;
