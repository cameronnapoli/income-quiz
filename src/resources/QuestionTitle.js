import React from 'react';
import PropTypes from 'prop-types';

function QuestionTitle(props) {
  return (
    <div className="questionTitle">
      {props.title}
    </div>
  );
}
QuestionTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default QuestionTitle;
