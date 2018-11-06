import React from 'react';

import StartPage from './StartPage';
import Page1 from './Page1';
import Page2 from './Page2';
import FinalPage from './FinalPage';
import DefaultPage from './DefaultPage';

import {FRONT_PAGE, Q1_PAGE, Q2_PAGE, FINAL_PAGE} from './constants';

function PageController(props) {
  switch (props.quizPageNumber) {
    case FRONT_PAGE:
      return <StartPage onChange={props.onChange} stateFunction={props.stateFunction} state={props.state}/>;

    case Q1_PAGE:
      return <Page1 onChange={props.onChange} stateFunction={props.stateFunction} state={props.state}/>;

    case Q2_PAGE:
      return <Page2 onChange={props.onChange} stateFunction={props.stateFunction} state={props.state}/>;

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
      return <DefaultPage/>;
  }
}

export default PageController;
