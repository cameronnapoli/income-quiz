import React from 'react';
import PropTypes from 'prop-types';

function QuestionTitle(props) {
  return (
    <div className={
      (props.className !== undefined ?
        props.className + " " : "") + "questionTitle"}
    >
      {props.title}
    </div>
  );
}

QuestionTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default QuestionTitle;
