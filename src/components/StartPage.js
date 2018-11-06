import React from 'react';

import QuestionTitle from './QuestionTitle';
import TransitionComponent from './TransitionComponent';
import {Q1_PAGE} from './constants';

function StartPage(props) {
  return (
    <div>
      <QuestionTitle title="Would you like to see how much money you've made today?"/>

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

export default StartPage;
