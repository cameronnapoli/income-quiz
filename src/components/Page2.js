import React from 'react';

import TimePicker from './TimePicker';
import QuestionTitle from './QuestionTitle';
import TransitionComponent from './TransitionComponent';

import {Q1_PAGE, FINAL_PAGE} from './constants';

function Page2(props) {
  return (
    <div>
      <QuestionTitle title="What time did you start working?"/>

      <div className="centerContainer">
        <div className="spacer height30"></div>

        <TimePicker stateFunction={props.stateFunction} state={props.state}/>

        <div className="spacer height30"></div>

        <TransitionComponent content="CONTINUE" toNum={FINAL_PAGE} onChange={props.onChange}/>
        &nbsp;
        <TransitionComponent content="BACK" toNum={Q1_PAGE} onChange={props.onChange}/>
      </div>
    </div>
  );
}

export default Page2;
