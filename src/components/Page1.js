import React from 'react';

import QuestionTitle from './QuestionTitle';
import TransitionComponent from './TransitionComponent';
import {FRONT_PAGE, Q2_PAGE} from './constants';

function Page1(props) {
  return (
    <div>
      <QuestionTitle title="Q1 (Dollars per hour?)"/>

      <div className="centerContainer">
        <div className="spacer height30"></div>

        Enter dollars per hour:&nbsp;<input type="number" className="dollarPicker" min="0"
                                            value={props.state.dollarsPerHour} onChange={
        (e) => props.stateFunction({dollarsPerHour: parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 0})
      }/>

        <div className="spacer height30"></div>

        <TransitionComponent content="CONTINUE" toNum={Q2_PAGE} onChange={props.onChange}/>
        &nbsp;
        <TransitionComponent content="BACK" toNum={FRONT_PAGE} onChange={props.onChange}/>
      </div>
    </div>
  );
}

export default Page1;
